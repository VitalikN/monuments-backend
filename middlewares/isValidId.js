const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { monumentId } = req.params;

  if (!isValidObjectId(monumentId)) {
    next(HttpError(400, `${monumentId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
