'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feeds', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        field: 'title',
        type: Sequelize.STRING(64),
        allowNull: false
      },
      url: {
        field: 'url',
        type: Sequelize.STRING(1024),
        allowNull: false
      },
      ngWord: {
        field: 'ng_word',
        type: Sequelize.STRING(128),
        allowNull: true
      },
      action: {
        field: 'action',
        type: Sequelize.STRING(32),
        allowNull: false
      },
      webhook: {
        field: 'webhook',
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feeds')
  }
}
