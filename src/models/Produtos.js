const { Model, DataTypes } = require('sequelize')

class Produtos extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            desc: DataTypes.STRING,
            preco: DataTypes.FLOAT
        }, {
            sequelize,
            tableName: 'produtos'
        })
    }

    static associate(models) {
        this.hasMany(models.Fotos_prod, { foreignKey: 'produto_id', as: 'fotos' })
        this.hasMany(models.Descontos, { foreignKey: 'produto_id', as: 'descontos' })
        this.belongsTo(models.Loja, { foreignKey: 'loja_id', as: 'loja' })
        this.belongsToMany(models.Categorias_prod, { foreignKey : 'produto_id', through: 'produtos_categoria_prod', as: 'categorias_prod'})
        this.belongsToMany(models.Caracteristicas, { foreignKey : 'produto_id', through: 'produto_caracteristicas', as: 'caracteristicas'})
        this.belongsToMany(models.Pedidos, { foreignKey : 'produto_id', through: 'pedido_produto', as: 'pedido'})
    }
}

module.exports = Produtos