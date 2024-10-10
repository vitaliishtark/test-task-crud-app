import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequilize';
import { User } from '../user/user.model';

export const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, 
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
  timestamps: true, 
});

User.hasOne(UserProfile, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL' });
