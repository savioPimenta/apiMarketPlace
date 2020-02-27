const Descontos = require('../models/Descontos')

module.exports = {

    // Retorna o desconto de um produto

    async index(req, res) {
        const { produto_id } = req.params

        const desconto = await Descontos.findOne({
            where: {
                produto_id
            }
        })

        return res.json(desconto)
    },

    // Adiciona um desconto a um produto

    async store(req, res) {
        const { produto_id } = req.params
        const { valor } = req.body

        let desconto = await Descontos.findOne({
            where: {
                produto_id
            }
        })

        if (desconto) {
            return res.json({ "message": "there is already a discount on this product, use update route" })
        }
        
        desconto = await Descontos.create({ produto_id, valor })

        return res.json(desconto)
    },

    // Deleta o desconto de um produto

    async delete(req, res) {
        const { produto_id } = req.params

        const desconto = await Descontos.findOne({
            where: {
                produto_id
            }
        })
        if (desconto) {
            await desconto.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent product id" })
    },

    // Deleta o desconto referente a um produto

    async update(req, res) {
        const { produto_id } = req.params
        const { valor } = req.body

        let desconto = await Descontos.findOne({
            where: {
                produto_id
            }
        })

        if (desconto) {
            if (valor) { desconto.valor = valor }

            await desconto.save()

            return res.json({ "Message": "successfully updated", desconto })
        }
        return res.json({ "Message": "nonexistent product id" })
    },
}