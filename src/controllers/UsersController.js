const Users = require('../models/Users')
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/index')
const { Op } = require('sequelize')
const Categorias = require('./CategoriasController')

module.exports = {
    async index(req, res) {
        const users = await Users.findAll()

        return res.json({ users })
    },
    async store(req, res) {
        const { nome, sobrenome, numero, email, senha } = req.body

        const { originalname: nameFoto, size, filename: key } = req.file

        let user = await Users.findOne({
            where: { email }
        })

        if (user) {
            return res.json({ error: "Esse email já está sendo usado por outro usuário! Tente outro" })
        }

        user = await Users.create({ nome, sobrenome, foto: key, numero, email, senha })

        return res.json(user)

    },
    async delete(req, res) {
        const { id } = req.params

        const users = await Users.findOne({
            where: {
                id
            }
        })
        if (users) {
            await users.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent user id" })
    },
    async update(req, res) {
        const { id } = req.params
        const { nome, sobrenome, numero, email, senha } = req.body

        const { originalname: nameFoto, size, filename: key } = req.file


        let users = await Users.findOne({
            where: {
                id
            }
        })

        if (users) {
            if (nome) { users.nome = nome }
            if (sobrenome) { users.sobrenome = sobrenome }
            if (key) { users.foto = key }
            if (email) { users.email = email }
            if (senha) { users.senha = senha }
            if (numero) { users.numero = numero }


            await users.save()

            return res.json({ "Message": "successfully updated", users })
        }
        return res.json({ "Message": "nonexistent user id" })

    },
    async select(req, res) {
        const { id } = req.params
        const { nome } = req.body

        let user = null

        if (id) {
            user = await Users.findOne({
                where: {
                    id
                }
            })
        } else {
            if (nome) {
                user = await Users.findAll({
                    where: { nome: { [Op.iLike]: `%${nome}%` } }
                })
            } else {
                return res.status(400).json({"message": "Preencha os dados necessários"})
            }
        }
        if (user) {
            return res.json(user)
        }
        return res.json({ "Message": "nonexistent user" })
    }
}