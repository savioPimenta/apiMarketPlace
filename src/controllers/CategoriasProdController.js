const Categorias_prod = require('../models/Categorias_prod')

module.exports = {
    async index(req, res) {
        const categoria_prod = await Categorias_prod.findAll()

        return res.json(categoria_prod)
    },
    async store(req, res) {
        const { name } = req.body
        
        const [categoria_prod] = await Categorias_prod.findOrCreate({
            where: { name }
        })

        return res.json(categoria_prod)
    },
    async delete(req, res) {
        const { categoria_id } = req.params

        const categoria_prod = await Categorias_prod.findOne({
            where: {
                id: categoria_id
            }
        })
        if (categoria_prod) {
            await categoria.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent category id" })
    },
    async update(req, res) {
        const { categoria_id } = req.params
        const { name } = req.body

        let categoria_prod = await Categorias_prod.findOne({
            where: {
                id: categoria_id
            }
        })

        if (categoria_prod) {
            if (name) { categoria_prod.name = name }

            await categoria_prod.save()

            return res.json({ "Message": "successfully updated", categoria_prods })
        }
        return res.json({ "Message": "nonexistent category id" })
    },
}