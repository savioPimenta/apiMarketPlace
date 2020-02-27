const { Model, DataTypes } = require('sequelize')

class Categorias extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'categorias'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Loja, { foreignKey : 'categorias_id', through: 'loja_categorias', as: 'lojas'})
    }
}

module.exports = Categorias