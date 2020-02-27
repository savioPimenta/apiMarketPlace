const { Model, DataTypes } = require('sequelize')

class Categorias_prod extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'categorias_prod'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Produtos, { foreignKey : 'categorias_id', through: 'produtos_categoria_prod', as: 'produto'})
    }
}

module.exports = Categorias_prod