const Loja = require('../models/Loja')
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/index')
const { Op } = require('sequelize')
const Categorias = require('./CategoriasController')

module.exports = {
    async index(req, res) {
        const lojas = await Loja.findAll()

        return res.json({ lojas })
    },
    async store(req, res) {
        const { name, horarios, foto = "teste", capa, latitude, longitude  } = req.body

        let categoriasArray = categorias

        let loja = await Loja.findOne({
            where: { name }
        })

        if (loja) {
            return res.json({ error: "Esse nome já está sendo usado por outra loja! Tente outro" })
        }

        loja = await Loja.create({ name, horarios, foto, capa, geo: { type: 'Point', coordinates: [latitude, longitude] } })

        return res.json({ loja })
    },
    async delete(req, res) {
        const { loja_id } = req.params

        const loja = await Loja.findOne({
            where: {
                id: loja_id
            }
        })
        if (loja) {
            await loja.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent store id" })
    },
    async update(req, res) {
        const { loja_id } = req.params
        const { name, horarios, foto, capa, geo } = req.body

        let loja = await Loja.findOne({
            where: {
                id: loja_id
            }
        })

        if (loja) {
            if (name) { loja.name = name }
            if (horarios) { loja.horarios = horarios }
            if (foto) { loja.foto = foto }
            if (capa) { loja.capa = capa }
            if (geo) { loja.geo = geo }

            await loja.save()

            return res.json({ "Message": "successfully updated", loja })
        }
        return res.json({ "Message": "nonexistent store id" })

    },
    async lojasProx(req, res) {
        var { latitude, longitude, maxDist } = req.query

        latitude = parseFloat(latitude)
        longitude = parseFloat(longitude)

        //const lojasProx = await sequelize.query(`SELECT * FROM loja WHERE ST_Distance_Sphere(ST_MakePoint(-45.440392, -20.4555061, ST_MakePoint(${longitude},${latitude})) <= (10 * 1609.34)`, { type: QueryTypes.SELECT });
        //const lojasProximas = await sequelize.query(`SELECT * FROM loja WHERE 'name' = 'Uai Do'`, { type: QueryTypes.SELECT });

        const location = sequelize.literal(`ST_GeomFromText('POINT(${latitude} ${longitude})', 4326)`);

        const lojasProx = await Loja.findAll({
            attributes: [[sequelize.fn('ST_DistanceSphere', sequelize.literal('geo'), location), 'distance'], "name"],
            where: {
                $and: sequelize.where(sequelize.fn('ST_DistanceSphere', sequelize.literal('geo'), location), {
                    [Op.lte]: maxDist * 1000
                })
            },
            //logging: console.log
        })

        return res.json({ lojasProx })
    },
    async select(req, res) {
        const { name } = req.body

        const loja = await Loja.findAll({
            where: { name: { [Op.iLike]: `${name}%` } }
        })

        if (loja) {
            return res.json({ loja })
        }
        return res.json({ "Message": "nonexistent store name" })
    }
}