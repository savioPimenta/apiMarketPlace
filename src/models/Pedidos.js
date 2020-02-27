const { Model, DataTypes } = require('sequelize')

class Pedidos extends Model {
    static init(sequelize) {
        super.init({
            desc: DataTypes.STRING,
            valor_total: DataTypes.FLOAT,
            valor_final: DataTypes.FLOAT,
            frete: DataTypes.FLOAT
        }, {
            sequelize,
            tableName: 'pedidos'
        })
    }
    
    static associate(models) {
        this.belongsToMany(models.Produtos, { foreignKey : 'pedido_id', through: 'pedido_produto', as: 'produtos'})
        this.belongsToMany(models.Caracteristicas, { foreignKey : 'pedido_id', through: 'pedido_caracteristica', as: 'caracteristicas'})
        //this.belongsToMany(models.User, { foreignKey : 'pedido_id', through: 'cesta', as: 'user'})
    }
}

module.exports = Pedidos