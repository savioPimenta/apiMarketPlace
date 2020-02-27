const Produtos = require('../models/Produtos')
const Loja = require('../models/Loja')

module.exports = {
    async index(req, res) {
        const produtos = await Produtos.findAll()

        res.json({ produtos })
    },
    async store(req, res) {
        const { name, desc, preco } = req.body

        const { loja_id } = req.params

        const loja = await Loja.findByPk(loja_id)

        if (!loja) {
            return res.json({ "message": "nonexistent store id" })
        }

        const produto = await Produtos.create({
            name,
            desc,
            preco,
            loja_id
        })

        return res.json({ "Message": "successfully added", produto })
    },
    async delete(req, res) {
        const { produto_id } = req.params

        const produto = await Produtos.findOne({
            where: {
                id: produto_id
            }
        })

        if (produto) {
            await produto.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent store id" })
    },
    async update(req, res) {
        const { produto_id } = req.params
        const { name, desc, preco } = req.body

        let produto = await Produtos.findOne({
            where: {
                id: produto_id
            }
        })

        if (produto) {
            if (name) { produto.name = name }
            if (desc) { produto.desc = desc }
            if (preco) { produto.preco = preco }

            await produto.save()

            return res.json({ "Message": "successfully updated", produto })
        }
        return res.json({ "Message": "nonexistent store id" })
    }
}