const { Model, DataTypes } = require('sequelize')

class Caracteristicas extends Model {
    static init(sequelize) {
        super.init({
            tipo: DataTypes.STRING,
            valor: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'caracteristicas'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Produtos, { foreignKey : 'caracteristicas_id', through: 'produto_caracteristicas', as: 'produto'})
        this.belongsToMany(models.Pedidos, { foreignKey : 'caracteristicas_id', through: 'pedido_caracteristica', as: 'pedido'})
    }
}

module.exports = Caracteristicas