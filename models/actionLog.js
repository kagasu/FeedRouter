const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ActionLog extends Model {
    static associate (models) {
    }
  };
  ActionLog.init({
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    feedId: {
      field: 'feed_id',
      type: DataTypes.INTEGER
    },
    urlHash: {
      field: 'url_hash',
      type: DataTypes.STRING,
      primaryKey: true
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
    modelName: 'ActionLog',
    tableName: 'action_logs'
  })
  return ActionLog
}
