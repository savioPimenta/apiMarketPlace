const Produtos = require('../models/Produtos')
const Loja = require('../models/Loja')

module.exports = {
    async selectByLoja(req, res) {
        const { loja_id } = req.params

        const produtos = await Produtos.findAll({
            where: {
                loja_id
            }
        })

        res.json({ produtos })
    }
}