const { Model, DataTypes } = require('sequelize')

class Fotos_prod extends Model {
    static init(sequelize) {
        super.init({
            foto: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'fotos_prod'
        })
    }
    static associate(models) {
        this.belongsTo(models.Produtos, { foreignKey: 'produto_id', as: 'produto' })
    }
}

module.exports = Fotos_prod