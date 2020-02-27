const { Model, DataTypes } = require('sequelize')

class Descontos extends Model {
    static init(sequelize) {
        super.init({
            valor: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'descontos'
        })
    }

    static associate(models) {
        this.belongsTo(models.Produtos, { foreignKey: 'produto_id', as: 'produto' })
    }
}

module.exports = Descontos