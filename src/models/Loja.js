const { Model, DataTypes } = require('sequelize')

class Loja extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            horarios: DataTypes.STRING,
            foto: DataTypes.STRING,
            cor: DataTypes.STRING,
            geo: DataTypes.GEOMETRY('POINT')
        }, {
            sequelize,
            tableName: 'loja'
        })
    }
    static associate(models) {
        this.hasMany(models.Produtos, { foreignKey: 'loja_id', as: 'produtos' })
        this.belongsToMany(models.Categorias, { foreignKey : 'loja_id', through: 'loja_categorias', as: 'categorias'})
    }
}

module.exports = Loja