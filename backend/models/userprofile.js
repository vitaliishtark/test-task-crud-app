'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProfile.init({
    userId: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  UserProfile.associate = function(models) {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  
  return UserProfile;
};