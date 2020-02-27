const Categorias = require('../models/Categorias')

module.exports = {
    async index(req, res) {
        const categoria = await Categorias.findAll()

        return res.json(categoria)
    },
    async store(req, res) {
        const { name } = req.body
        
        const [categoria] = await Categorias.findOrCreate({
            where: { name }
        })

        return res.json(categoria)
    },
    async delete(req, res) {
        const { categoria_id } = req.params

        const categoria = await Categorias.findOne({
            where: {
                id: categoria_id
            }
        })
        if (categoria) {
            await categoria.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent category id" })
    },
    async update(req, res) {
        const { categoria_id } = req.params
        const { name } = req.body

        let categoria = await Categorias.findOne({
            where: {
                id: categoria_id
            }
        })

        if (categoria) {
            if (name) { categoria.name = name }

            await categoria.save()

            return res.json({ "Message": "successfully updated", categoria })
        }
        return res.json({ "Message": "nonexistent category id" })
    },
}