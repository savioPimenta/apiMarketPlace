const { Model, DataTypes } = require('sequelize')

class Cestas extends Model {
    static init(sequelize) {
        super.init({
            pedido_id: DataTypes.STRING,
            status: DataTypes.STRING,
            data_pedido: DataTypes.DATE,
            valor_total: DataTypes.FLOAT,
            active: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'cestas'
        })
    }
    
    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Cestas