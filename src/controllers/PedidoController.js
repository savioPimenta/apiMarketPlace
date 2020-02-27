const Pedidos = require('../models/Pedidos')
const Produtos = require('../models/Produtos')
const Caracteristicas = require('../models/Caracteristicas')
const Users = require('../models/Users')
const Cestas = require('../models/Cestas')

const { Op } = require('sequelize')


module.exports = {

    // Lista pedidos ativos da pessoa

    async select(req, res) {
        const { user_id } = req.params

        const cesta = await Cestas.findOne({
            user_id,
            active: "ative"
        })

        const arrayPedidos = cesta.pedido_id.split(',').map(tech => {
            tech.trim()

            tech = parseInt(tech)

            const container = {};

            container['id'] = tech;

            return container
        });

        const pedidos = await Pedidos.findAll({
            where: {
                [Op.or]: arrayPedidos
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos', attributes: ['id', 'name'] }
            ]
        })

        return res.json(pedidos)
    },

    // Lista pedidos ativos e inativos da pessoa

    async index(req, res) {
        const { user_id } = req.params

        const cesta = await Cestas.findOne({
            user_id
        })

        const arrayPedidos = cesta.pedido_id.split(',').map(tech => {
            tech.trim()

            tech = parseInt(tech)

            const container = {};

            container['id'] = tech;

            return container
        });

        const pedidos = await Pedidos.findAll({
            where: {
                [Op.or]: arrayPedidos
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos', attributes: ['id', 'name'] }
            ]
        })

        return res.json(pedidos)
    },

    // Cria pedido

    async store(req, res) {
        const { user_id } = req.params
        const { produto_id, caracteristica_id } = req.body

        const user = Users.findOne({
            where: {
                id: user_id
            }
        })

        if (!user) {
            return res.status(400).json({ "Error": "Esse usuário não existe" })
        }

        // Acha o produto

        let produto = await Produtos.findByPk(produto_id, {
            include: {
                association: 'descontos',
                attributes: ['valor']
            }
        })

        // Isola o valor do desconto

        descontos = produto.descontos
        let valor

        descontos.map(function (obj) {
            valor = obj.valor
        });

        const caracteristica = await Caracteristicas.findOne({
            where: {
                id: caracteristica_id,
            },
            include: {
                association: 'produto',
                where: {
                    id: produto_id,
                }
            }
        })

        if (!caracteristica) {
            return res.status(400).json({ "Error": "Essa caracteristica não está disponível para este produto" })
        }

        const valor_total = produto.preco

        const valor_final = valor_total * ((100 - valor) / 100)

        const desc = "Caracteristica: " + caracteristica_id

        const pedido = await Pedidos.create({ desc, valor_total, valor_final, frete: 10 })

        const pedido_prod = await pedido.addProdutos(produto)
        const pedido_caract = await pedido.addCaracteristicas(caracteristica)

        let cesta = await Cestas.findOne({
            where: {
                user_id,
                active: "ativa"
            }
        })

        if (!cesta) {
            cesta = await Cestas.create({
                pedido_id: pedido.id,
                user_id,
                valor_total: valor_final,
                data_pedido: Date.now(),
                active: "ativa",
                status: "selecao"
            })
            return res.json({ "Success": "Cesta criada", cesta })
        }

        if (pedido.id) { cesta.pedido_id = (cesta.pedido_id) + ", " + pedido.id }
        if (valor_final) { cesta.valor_total = cesta.valor_total + valor_final }

        cesta = await cesta.save()

        return res.json(cesta)
    },

    // Retorna pedido específico

    async selectById(req, res) {
        const { id } = req.params

        const pedido = await Pedidos.findOne({
            where: {
                id
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos', attributes: ['id', 'name'] }
            ]
        })

        if (!pedido) {
            return res.json({ "Message": "nonexistent request id" })
        }

        return res.json(pedido)
    },

    // Edita pedido específico

    async update(req, res) {
        const { id } = req.params
        let { produto_id, caracteristica_id } = req.body

        let pedido = await Pedidos.findOne({
            where: {
                id
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos' }
            ]
        })
        // Isola o id do pedido se não for passado
        produtos = pedido.produtos
        let produto_id_escopo

        produtos.map(function (obj) {
            produto_id_escopo = obj.pedido_produto.produto_id
        });

        // Isola o id da caracteristica se não for passada

        caracteristicas = pedido.caracteristicas
        let caracteristica_id_escopo

        caracteristicas.map(function (obj) {
            caracteristica_id_escopo = obj.pedido_caracteristica.caracteristicas_id
        });

        if (!produto_id) { produto_id = produto_id_escopo }
        if (!caracteristica_id) { caracteristica_id = caracteristica_id_escopo }

        const produto = await Produtos.findOne({ where: { id: produto_id } })
        await pedido.setProdutos(produto)

        const caracteristica = await Caracteristicas.findOne({ where: { id: caracteristica_id } })
        await pedido.setCaracteristicas(caracteristica)

        pedido = await Pedidos.findOne({
            where: {
                id
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos' }
            ]
        })

        return res.json(pedido)
    },

    // Deleta pedido específico

    async delete(req, res) {
        const { id } = req.params

        const pedido = await Pedidos.findOne({
            where: {
                id
            },
            include: [
                { association: 'caracteristicas', attributes: ['tipo', 'valor'] },
                { association: 'produtos' }
            ]
        })

        if (pedido) {
            await pedido.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent request id" })

    },

    async concluded(req, res) {
        const { id } = req.params
        let { status } = req.body

        let cesta = await Cestas.findOne({
            where: {
                id
            }
        })

        // selecao
        // selecao_finalizada
        // em_rota_de_entrega
        // entregue
        // cancelado

        // ativa
        // pendente
        // concluida

        if (status == "selecao") {
            cesta.active = "ativa"
        }

        if (status == "selecao_finalizada" || status == "em_rota_de_entrega") {
            cesta.active = "pendente"
        }

        if (status == "entregue" || status == "cancelado") {
            cesta.active = "concluido"
        }
        cesta.status = status

        await cesta.save()

        return res.json(cesta)
    },
}
