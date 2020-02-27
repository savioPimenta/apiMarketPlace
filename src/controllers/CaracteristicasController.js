const Caracteristicas = require('../models/Caracteristicas')

module.exports = {
    async index(req, res) {
        const caracteristicas = await Caracteristicas.findAll()

        return res.json(caracteristicas)
    },
    async store(req, res) {
        const { tipo, valor } = req.body
        
        const [caracteristicas] = await Caracteristicas.findOrCreate({
            where: { tipo, valor }
        })

        return res.json(caracteristicas)
    },
    async delete(req, res) {
        const { caracteristicas_id } = req.params

        const caracteristicas = await Caracteristicas.findOne({
            where: {
                id: caracteristicas_id
            }
        })
        if (caracteristicas) {
            await caracteristicas.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent characteristics id" })
    },
    async update(req, res) {
        const { caracteristicas_id } = req.params
        const { tipo, valor } = req.body

        let caracteristicas = await Caracteristicas.findOne({
            where: {
                id: caracteristicas_id
            }
        })

        if (caracteristicas) {
            if (tipo) { caracteristicas.tipo = tipo }
            if (valor) { caracteristicas.valor = valor }

            await caracteristicas.save()

            return res.json({ "Message": "successfully updated", caracteristicas })
        }
        return res.json({ "Message": "nonexistent characteristics id" })
    },
}