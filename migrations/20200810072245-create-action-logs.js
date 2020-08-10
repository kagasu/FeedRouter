'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('action_logs', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      feedId: {
        field: 'feed_id',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      urlHash: {
        field: 'url_hash',
        type: Sequelize.STRING(128),
        allowNull: false
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

    await queryInterface.addIndex('action_logs', ['feed_id', 'url_hash'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('action_logs')
  }
}
