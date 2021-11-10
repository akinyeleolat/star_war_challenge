import {
  validate,
  toLowerCaseAndTrim,
} from '../../utils';


/**
  * validate user login endpoint
  * @param {Object} req - request body
  * @param {Object} res - response body
  * @param {Object} next - call next function
  * @returns {Function} validate - call validate function
*/
export const validatePagination = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.query);
  req.formattedValues = formattedValues;
  const { limit, page } = formattedValues;


  const data = {
    limit, page
  };

  const paginationRules = {
    limit: 'integer',
    page: 'integer',
  };
  validate(data, paginationRules, res, next);
};

export default validatePagination;
