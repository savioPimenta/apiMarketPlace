const Loja = require('../models/Loja')

module.exports = {
    async store(req, res) {
        const { name, horarios, latitude, longitude, cor } = req.body

        const { originalname: nameFoto, size, filename: key } = req.file

        let loja = await Loja.findOne({
            where: { name }
        })

        if (loja) {
            return res.json({ error: "Esse nome já está sendo usado por outra loja! Tente outro" })
        }

        loja = await Loja.create({ name, horarios, foto: key, cor, geo: { type: 'Point', coordinates: [latitude, longitude] } })

        return res.json({ loja })

    }
}