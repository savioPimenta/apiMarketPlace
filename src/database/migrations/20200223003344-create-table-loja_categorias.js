'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('loja_categorias', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        loja_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'loja', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        categorias_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'categorias', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('loja_categorias');
  }
};
