const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
    async index(req, res) {
        const { email, senha } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(400).send({ error: "User not found" })

        if (!await bcrypt.compare(senha, user.senha))
            return res.status(400).send({ error: "Invalid password" })

        user.senha = undefined

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400
        })

        res.send({user, token})
    }
}