import bcrypt from 'bcryptjs';
import axios from 'axios';
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


export const getRequiredMovieData = movieList => movieList.map((movie, index) => ({
  movieId: (index + 1),
  title: movie.title,
  releaseDate: movie.release_date,
  openingCrawl: movie.opening_crawl,
  url: movie.url
}));

export const getRequiredCharacterData = characterList => characterList.map((character, index) => ({
  characterId: (index + 1),
  name: character.name,
  gender: character.gender,
  height: character.height,
  url: character.url
}));

export const sortByReleaseDate = sortData => sortData
  .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

const sortByName = sortData => sortData.sort((a, b) => {
  a = a.name.toLowerCase();
  b = b.name.toLowerCase();
  return a.localeCompare(b);
});

const sortByGender = sortData => sortData.sort((a, b) => {
  const x = a.gender.toLowerCase();
  const y = b.gender.toLowerCase();
  return x.localeCompare(y);
});

const handleSortDirection = (sortData, direction) => (direction === 'desc' ? sortData.reverse() : sortData);

export const sortDataBy = (data, value, direction = 'asc') => {
  let sortedData;
  if (value.toLowerCase() === 'name') {
    const sortData = sortByName(data);
    sortedData = handleSortDirection(sortData, direction.toLowerCase());
  } else if (value.toLowerCase() === 'height') {
    sortedData = data.sort((a, b) => (direction.toLowerCase() === 'desc' ? Number(b.height) - Number(a.height) : Number(a.height) - Number(b.height)));
  } else if (value.toLowerCase() === 'gender') {
    const sortData = sortByGender(data);
    sortedData = handleSortDirection(sortData, direction.toLowerCase());
  } else {
    sortedData = data;
  }
  return sortedData;
};

const toFeetAndInch = inches => (`${parseInt(inches / 12, 10)}ft. ${Math.round(inches % 12, 1)}inches`);

export const computeHeight = (data) => {
  const totalHeight = data
    .map(height => parseInt(height.height, 10))
    // eslint-disable-next-line no-restricted-globals
    .filter(x => !isNaN(x))
    .reduce((sum, height) => sum + height, 0);

  const heightInInches = Number((totalHeight / 2.54).toFixed(2));
  const heightInFeetAndInch = toFeetAndInch(heightInInches);
  return {
    heightInCm: totalHeight,
    heightInFeetAndInch
  };
};

export const apiGetRequest = url => axios.get(url);

export const getCharacterDetail = async (characterUrl) => {
  const res = await axios.get(characterUrl);
  const {
    name,
    gender,
    height
  } = res.data;
  return {
    name,
    gender,
    height
  };
};
