const express = require('express');
const { signup, signin, google } = require('../controllers/authController');
const { addUserValidators, addUserValidationHandler } = require('../middlewires/users/userValidators');

const router = express.Router();
router.post('/google', google);
router.post('/liveValidate', addUserValidators, addUserValidationHandler);
router.post('/signup', addUserValidators, addUserValidationHandler, signup);
router.post('/signin', signin);

module.exports = router;