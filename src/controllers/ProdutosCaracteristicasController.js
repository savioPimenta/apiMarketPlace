const Produtos = require('../models/Produtos')
const Caracteristicas = require('../models/Caracteristicas')
const { Op } = require('sequelize')

module.exports = {

    // Retorna todas as caracteristicas de um produto

    async index(req, res) { 
        const { produto_id } = req.params

        const produto = await Produtos.findByPk(produto_id, {
            include: {
                association: 'caracteristicas'
            }
        })

        return res.json(produto)
    },

    // Adiciona uma caracteristica a um produto
    // Se a caracteristica não existir, é criada

    async store(req, res) {
        const { produto_id } = req.params
        const { tipo, valor } = req.body

        const produto = await Produtos.findByPk(produto_id)

        if (!produto) {
            return res.status(400).json({ error: 'Product not found' })
        }

        const [caracteristicas] = await Caracteristicas.findOrCreate({
            where: { tipo, valor }
        })

        await produto.addCaracteristicas(caracteristicas)

        return res.json(caracteristicas)
    },

    // Deleta uma caracteristica de um produto

    async delete(req, res) {
        const { produto_id } = req.params
        const { tipo, valor } = req.body

        const produto = await Produtos.findByPk(produto_id)

        if (!produto) {
            return res.status(400).json({ error: 'Product not found' })
        }

        const caracteristica = await Caracteristicas.findOne({
            where: { tipo, valor }
        })

        await produto.removeCaracteristicas(caracteristica)

        return res.json({"message":"successfully deleted"})
    },

    // Retorna todos os produtos com uma caracteristica pelo tipo da caracteristica

    async selectByTipo(req, res) {
        const { tipo } = req.body

        const produtos = await Produtos.findAll({
            include: [
                { association: "caracteristicas", where: { tipo: { [Op.iLike]: `%${tipo}%` } }, attributes: ['tipo'], },
            ]
        })

        return res.json({ produtos })
    },

    // Retorna todos os produtos com uma caracteristica pelo valor da caracteristica

    async selectByValor(req, res) {
        const { valor } = req.body

        const produtos = await Produtos.findAll({
            include: [
                { association: "caracteristicas", where: { valor: { [Op.iLike]: `%${valor}%` } }, attributes: ['valor'], },
            ]
        })

        return res.json({ produtos })
    },

    // Retorna todos os produtos com uma caracteristica pelo id da caracteristica

    async selectById(req, res) {
        const { id } = req.params

        const produtos = await Produtos.findAll({
            include: [
                { association: "caracteristicas", where: { id } },
            ]
        })

        return res.json({ produtos })
    },
}