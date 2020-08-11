const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    static associate (models) {
    }
  };
  Feed.init({
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      field: 'title',
      type: DataTypes.STRING
    },
    url: {
      field: 'url',
      type: DataTypes.STRING
    },
    ngWord: {
      field: 'ng_word',
      type: DataTypes.STRING
    },
    action: {
      field: 'action',
      type: DataTypes.STRING
    },
    emailSubject: {
      field: 'email_subject',
      type: DataTypes.STRING
    },
    emailBody: {
      field: 'email_body',
      type: DataTypes.STRING
    },
    webhook: {
      field: 'webhook',
      type: DataTypes.STRING
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Feed',
    tableName: 'feeds'
  })
  return Feed
}
