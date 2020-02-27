const Fotos_prod = require('../models/Fotos_prod')

module.exports = {
    async index(req, res) {
        const { produto_id } = req.params

        const fotos = await Fotos_prod.findAll({
            where: {
                produto_id
            }
        })

        return res.json(fotos)
    },
    async store(req, res) {
        const { produto_id } = req.params

        const { originalname: nameFoto, size, filename: key } = req.file
        
        const foto = await Fotos_prod.create({ produto_id, foto: key })

        return res.json(foto)
    },
    async delete(req, res) {
        const { id } = req.params

        const foto = await Fotos_prod.findOne({
            where: {
                id
            }
        })
        if (foto) {
            await foto.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent photo id" })
    },
    async update(req, res) {
        const { id } = req.params
        const { originalname: nameFoto, size, filename: key } = req.file

        let fotos = await Fotos_prod.findOne({
            where: {
                id: id
            }
        })

        if (fotos) {
            if (key) { fotos.foto = key }

            await fotos.save()

            return res.json({ "Message": "successfully updated", fotos })
        }
        return res.json({ "Message": "nonexistent photo id" })
    },
}