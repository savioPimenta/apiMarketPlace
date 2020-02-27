const Produtos = require('../models/Produtos')
const Caracteristicas = require('../models/Caracteristicas')
const { Op } = require('sequelize')

module.exports = {

    // Retorna o valor do produto com desconto

    async index(req, res) {
        const { produto_id } = req.params

        const produto = await Produtos.findByPk(produto_id, {
            include: {
                association: 'descontos',
                attributes: ['valor']
            }
        })

        descontos = produto.descontos

        let valor

        descontos.map(function (obj) {
            valor = obj.valor
        });

        const precofinal = produto.preco * ((100 - valor) / 100)

        return res.json(precofinal)
    },

    // Procura produtos com o desconto especifico

    async descSearch(req, res) {
        const { valor } = req.params

        if(!valor) {
            return res.status(400).json({ error: 'Value not found' })
        }

        const produto = await Produtos.findAll({
            include: {
                association: 'descontos',
                attributes: ['valor'],
                where: { valor }
            }
        })

        if (!produto) {
            return res.status(400).json({ error: 'Discount not found' })
        }

        return res.json(produto)
    }
}