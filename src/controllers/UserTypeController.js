import UserTypeServices from '../services/UserType';
import { displayError } from '../utils';

const UsertypeServiceInstance = new UserTypeServices();


export const getAllUserType = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.getAll();

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};


export const createUserType = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.create(req.body);

    return res.json(results).status(201);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};


export const findUserTypeByName = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.find(req.body);

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};

export const findUserTypeById = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.find(req.params);

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};


export const updateUserType = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.update(req.body);

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};

export const filterUserType = async (req, res) => {
  try {
    const results = await UsertypeServiceInstance.findBy(req.query);
    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};
