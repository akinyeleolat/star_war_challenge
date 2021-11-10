import model from '../models';
import { comparePassword, tokenGenerator } from '../utils';
import Error from '../utils/ErrorUtils';
import envConfig from '../configs';

/**
 * user services
 */
class UserServices {
  /**
     * initiate user model
     */
  constructor() {
    this.UserModel = model.User;
  }

  /**
   * authenticate user data
   * @param {*} userData
   * @returns {object} user
   */
  async authenticateUser(userData) {
    try {
      const { email, password } = userData;
      const user = await this.UserModel.findOne({ where: { email } });

      if (!user) {
        throw new Error('Authentication error', 404, 'User does not exist');
      }

      if (userData && !comparePassword(user.password, password)) {
        throw new Error('Authentication error', 400, 'User credentials are invalid');
      }

      const { id } = user;
      const accessToken = tokenGenerator(id, user.email, envConfig.tokenExpiry, envConfig.secret);
      const result = {
        id,
        email: user.email,
        token: accessToken
      };
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return error;
    }
  }


  /**
   * get user data
   * @param {*} userId
   * @returns {object} user
   */
  async getUserById(userId) {
    try {
      const user = await this.UserModel.findByPk(userId);

      if (!user) {
        throw new Error('Data Error', 404, 'User does not exist');
      }
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return error;
    }
  }
}

export default UserServices;
