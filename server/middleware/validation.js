const { validationResult } = require('express-validator');
const sendResponse = require('../utils/apiResponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg).join(', ');
    return sendResponse(res, 400, false, extractedErrors);
  }
  next();
};

module.exports = validate;