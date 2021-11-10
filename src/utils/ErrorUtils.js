
/**
 * error handler
 */
class UsefulError extends Error {
  /**
     * error meta
     * @param {*} name
     * @param {*} httpStatusCode
     * @param {*} message
     * @param {*} context
     * @param  {...any} params
     */
  constructor(name, httpStatusCode = 500, message, context, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UsefulError);
    }

    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.context = context;
    this.date = new Date();
  }
}
export default UsefulError;
