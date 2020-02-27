const { Model, DataTypes } = require('sequelize')

class Addresses extends Model {
    static init(sequelize) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
            geo: DataTypes.GEOMETRY('POINT'),
            desc: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'addresses'
        })
    }

    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Addresses