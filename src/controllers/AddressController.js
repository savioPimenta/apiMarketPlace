const User = require('../models/Users')
const Addresses = require('../models/Addresses')

module.exports = {
    async index(req, res) {
        const { id } = req.params

        const user = await User.findByPk(id, {
            include: { association: 'addresses' }
        })

        return res.json(user.addresses)
    },

    async store(req, res) {
        const { id } = req.params
        const { zipcode, street, number, latitude, longitude, desc } = req.body

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const address = await Addresses.create({
            zipcode,
            street,
            number,
            desc,
            geo: { type: 'Point', coordinates: [latitude, longitude] },
            user_id:id
        })

        return res.json({ address })
    },

    async delete(req, res) {
        const { id } = req.params

        const address = await Addresses.findOne({
            where: {
                id
            }
        })
        if (address) {
            await address.destroy()
            return res.json({ "Message": "successfully deleted" })
        }
        return res.json({ "Message": "nonexistent address id" })
    },
    async update(req, res) {
        const { id } = req.params
        const { zipcode, street, number, latitude, longitude, desc } = req.body

        let address = await Addresses.findOne({
            where: {
                id
            }
        })

        if (address) {
            if (zipcode) { address.zipcode = zipcode }
            if (street) { address.street = street }
            if (number) { address.number = number }
            if (desc) { address.desc = desc }
            if (latitude && longitude) { address.geo =  { type: 'Point', coordinates: [latitude, longitude] } }

            await address.save()

            return res.json({ "Message": "successfully updated", address })
        }
        return res.json({ "Message": "nonexistent address id" })

    },
}