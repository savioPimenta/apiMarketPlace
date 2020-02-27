const Loja = require('../models/Loja')
const Categorias = require('../models/Categorias')
const { Op } = require('sequelize')

module.exports = {
    async index(req, res) {
        const { loja_id } = req.params

        const loja = await Loja.findByPk(loja_id, {
            include: {
                association: 'categorias',
                attributes: ['name'],
                through: { attributes: [] }
            }
        })

        return res.json(loja)
    },

    async store(req, res) {
        const { loja_id } = req.params
        const { name } = req.body

        const loja = await Loja.findByPk(loja_id)

        if (!loja) {
            return res.status(400).json({ error: 'Store not found' })
        }

        const [categoria] = await Categorias.findOrCreate({
            where: { name }
        })

        await loja.addCategoria(categoria)

        return res.json(categoria)
    },

    async stores(req, res) {
        const { loja_id } = req.params
        const { name } = req.body

        const loja = await Loja.findByPk(loja_id)

        if (!loja) {
            return res.status(400).json({ error: 'Store not found' })
        }
        nameArray = name.split(',').map(async categorias => {
            categorias.trim()

            const [categoria] = await Categorias.findOrCreate({
                where: { name: categorias }
            })
            await loja.addCategoria(categoria)
        });

        return res.json({ "message": "success" })
    },

    async delete(req, res) {
        const { loja_id } = req.params
        const { name } = req.body

        const loja = await Loja.findByPk(loja_id)

        if (!loja) {
            return res.status(400).json({ error: 'Store not found' })
        }

        const categoria = await Categorias.findOne({
            where: { name }
        })

        await loja.removeCategoria(categoria)

        return res.json()
    },

    async select(req, res) {
        const { name } = req.body

        const lojas = await Loja.findAll({
            include: [
                { association: "categorias", where: { name: { [Op.iLike]: `%${name}%` } }, attributes: ['name'], },
            ]
        })

        return res.json({ lojas })
    },

    async selectById(req, res) {
        const { id } = req.params

        const lojas = await Loja.findAll({
            include: [
                { association: "categorias", where: { id }, attributes: ['name'], },
            ]
        })

        return res.json({ lojas })
    },
}