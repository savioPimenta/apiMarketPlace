'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('produto_caracteristicas', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        produto_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'produtos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        caracteristicas_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'caracteristicas', key: 'id'},
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
      return queryInterface.dropTable('produto_caracteristicas');
  }
};
