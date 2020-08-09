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
    action: {
      field: 'action',
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
