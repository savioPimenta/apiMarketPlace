const { Model, DataTypes } = require('sequelize')

class Users extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            numero: DataTypes.INTEGER,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            foto: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'users'
        })
    }

    static associate(models) {
        this.hasMany(models.Cestas, { foreignKey: 'user_id', as: 'cestas' })
        this.hasMany(models.Addresses, { foreignKey: 'user_id', as: 'addresses' })
    }
}

module.exports = Users