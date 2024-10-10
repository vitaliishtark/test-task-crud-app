import { User } from './user.model';
import { UserProfile } from '../user_profile/user_profile.model';
import { sequelize } from '../../config/sequilize';
export class UserService {
  static async createUser(data) {
    const transaction = await sequelize.transaction(); 
    try {
      if (!data.firstName || !data.lastName || !data.email) {
        throw new Error('First name, last name, and email are required.');
      }
  
      if (!data.city || !data.dateOfBirth || !data.phoneNumber) {
        throw new Error('Date of birth, city, and phone number are required for the user profile.');
      }

      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      }, { transaction });
  
      const userProfile = await UserProfile.create({
        dateOfBirth: data.dateOfBirth,
        city: data.city,
        phoneNumber: data.phoneNumber,
        userId: user.id,
      }, { transaction });
  
      await transaction.commit();
  
      return { user, userProfile };
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating user:', error.message);
      throw new Error(error.message);
    }
  }
  
  

  static async getAllUsers() {
    try {
      return await User.findAll({ include: [UserProfile] });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Unable to fetch users.');
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id, { include: [UserProfile] });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Unable to fetch user by ID.');
    }
  }

  static async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    
    await user.update({
      ...data,
      updatedAt: new Date()
    });

    const userProfile = await UserProfile.findOne({ where: { userId: user.id } });
    if (userProfile) {
      await userProfile.update({
        ...data,
        updatedAt: new Date(),
      });
    }

    return { user, userProfile };
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    
    await user.destroy();
    return 'User deleted';
  }
}
