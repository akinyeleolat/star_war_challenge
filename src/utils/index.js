import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

export const uuidFormat = 'regex:/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/';

/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


/**
 * @param {string} id
 * @param {string} email
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
export const tokenGenerator = (id, email, tokenExpiryDate = '1h', secret = 'secret') => {
  const payload = { id };
  if (email) {
    payload.email = email;
  }
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};


/**
 * check Validation function
 * @param {Object} data - data to be validated
 * @param {Object} rules - rules for validation
 * @returns {Boolean} true - if validation passes
 * @returns {Object} error Object - if validation falis
 */
export const checkValidation = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.passes()) {
    return true;
  }
  return {
    error: {
      status: 400,
      message: validation.errors.all()
    }
  };
};

/**
 * Display error
 * @param {Object} err
 * @param {Object} res
 * @param {number} status
 * @returns {Object} response body - statusCode and errorMessage
 */
export const displayError = (err, res, status = 400) => {
  res.status(status).json({
    status,
    message: err.message
  });
};

/**
 * validate endpoint
 * @param {Object} data - data to be validated
 * @param {Object} rules - rules for validation
 * @param {Object} response - response body
 * @param {Object} nextFunction - call next function middleware
 * @returns {Boolean} true - if validation passes
 * @returns {Object} error Object - if validation fails
 */
export const validate = (data, rules, response, nextFunction) => {
  const check = checkValidation(data, rules);
  return check === true ? nextFunction() : displayError(check.error, response);
};
/**
 * @param {string} hashPwd
 * @param {string} password
 * @return {string} hash
 */
export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

/**
 * @param {string} token
 * @return {object} decodeToken
 */
export const decodeToken = token => jwt.verify(token, process.env.SECRET);

/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {number} status
 * @return {object} response
 */
export const handleSuccessResponse = (data, message, res, status = 200) => (
  res.status(status).json({
    status: 'success',
    message,
    data
  })
);

/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {string} status
 * @param {number} statusCode
 * @return {object} response
 */
export const handleResponse = (data, message, res, status, statusCode) => (
  res.status(statusCode).json({
    status,
    message,
    data
  })
);

/**
 * @param {object} inputObject
 * @return {object} formattedObject
 */
export const toLowerCaseAndTrim = (inputObject) => {
  const formattedObject = {};
  Object.entries(inputObject).forEach((element) => {
    const key = element[0];
    const value = element[1];
    formattedObject[key] = value.toString().replace(/\s/g, '').toLowerCase();
  });
  return formattedObject;
};
