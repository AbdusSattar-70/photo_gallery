const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model');

// add user
const addUserValidators = [
  check('userName')
    .isLength({ min: 1 })
    .withMessage('User Name is required')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ userName: value });
        if (user) {
          throw Error('User Name already is used!');
        }
      } catch (err) {
        throw Error(err.message);
      }
    }),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw Error('Email already is used!');
        }
      } catch (err) {
        throw Error(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol',
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({ errors: mappedErrors });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
