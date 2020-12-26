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
      type: {
        field: 'type',
        type: Sequelize.STRING(16),
        allowNull: false
      },
      url: {
        field: 'url',
        type: Sequelize.STRING(1024),
        allowNull: true
      },
      script: {
        field: 'script',
        type: Sequelize.TEXT('long'),
        allowNull: true
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
      emailSubject: {
        field: 'email_subject',
        type: Sequelize.STRING(128),
        allowNull: true
      },
      emailBody: {
        field: 'email_body',
        type: Sequelize.TEXT,
        allowNull: true
      },
      webhook: {
        field: 'webhook',
        type: Sequelize.TEXT,
        allowNull: true
      },
      checkIntervalMinutes: {
        field: 'check_interval_minutes',
        type: Sequelize.INTEGER,
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
      },
      checkedAt: {
        field: 'checked_at',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feeds')
  }
}
