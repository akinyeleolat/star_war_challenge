import UserServices from '../services/User';
import { displayError } from '../utils';

const UserServiceInstance = new UserServices();

export const login = async (req, res, next) => {
  try {
    const results = await UserServiceInstance.authenticateUser(req.body);

    if (results instanceof Error) {
      return displayError(results, res, results.httpStatusCode);
    }

    return res.json(results).status(200);
  } catch (error) {
    return next(error);
  }
};

export default login;
