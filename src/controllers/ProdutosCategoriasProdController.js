const Produtos = require('../models/Produtos')
const Categorias_prod = require('../models/Categorias_prod')
const { Op } = require('sequelize')

module.exports = {

    // Retorna todas as categorias de um produto

    async index(req, res) { 
        const { produto_id } = req.params

        const produto = await Produtos.findByPk(produto_id, {
            include: {
                association: 'categorias_prod',
                attributes: ['name'],
                through: { attributes: [] }
            }
        })

        return res.json(produto)
    },

    // Adiciona uma categoria a um produto
    // Se a categoria não existir, é criada

    async store(req, res) {
        const { produto_id } = req.params
        const { name } = req.body

        const produto = await Produtos.findByPk(produto_id)

        if (!produto) {
            return res.status(400).json({ error: 'Product not found' })
        }

        const [categoria_prod] = await Categorias_prod.findOrCreate({
            where: { name }
        })

        await produto.addCategorias_prod(categoria_prod)

        return res.json(categoria_prod)
    },

    // Adiciona múltiplas categorias a um produto

    async stores(req, res) {
        const { produto_id } = req.params
        const { name } = req.body

        const produto = await Loja.findByPk(produto_id)

        if (!produto) {
            return res.status(400).json({ error: 'Product not found' })
        }
        nameArray = name.split(',').map(async categorias_prod => {
            categorias_prod.trim()

            const [categoria_prod] = await Categorias_prod.findOrCreate({
                where: { name: categorias_prod }
            })
            await produto.addCategoria_prod(categoria_prod)
        });

        return res.json({ "message": "success" })
    },

    // Deleta uma categoria de um produto

    async delete(req, res) {
        const { produto_id } = req.params
        const { name } = req.body

        const produto = await Produtos.findByPk(produto_id)

        if (!produto) {
            return res.status(400).json({ error: 'Product not found' })
        }

        const categoria_prod = await Categorias_prod.findOne({
            where: { name }
        })

        await produto.removeCategoria_prod(categoria_prod)

        return res.json()
    },

    // Retorna todos os produtos de uma categoria pelo nome da categoria

    async select(req, res) {
        const { name } = req.body

        const produtos = await Produtos.findAll({
            include: [
                { association: "categorias_prod", where: { name: { [Op.iLike]: `%${name}%` } }, attributes: ['name'], },
            ]
        })

        return res.json({ produtos })
    },

    // Retorna todos os produtos de uma categoria pelo id da categoria

    async selectById(req, res) {
        const { id } = req.params

        const produtos = await Produtos.findAll({
            include: [
                { association: "categorias_prod", where: { categorias_id: id }, attributes: ['name'], },
            ]
        })

        return res.json({ produtos })
    },
}