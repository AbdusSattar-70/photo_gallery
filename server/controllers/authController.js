/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const errorHandler = require('../utils/errorHandler');

const signup = async (req, res, next) => {
  try {
    const {
      userName, email, password, avatar, role,
    } = req.body;

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      userName, email, password: hashedPass, avatar, role,
    });
    await newUser.save();
    res.status(200).json('User Created successfully');
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not Found'));
    const isValidPassword = await bcryptjs.compare(password, validUser.password);
    if (!isValidPassword) return next(errorHandler(401, 'Wrong credentials'));
    if (validUser && isValidPassword) {
      // generate JWT TOKEN
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });
      // set cookie and send successful status to user
      // prepare user data except password
      const { password: pass, ...restInfo } = validUser._doc;
      res.cookie(process.env.COOKIE_SECRET, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      }).json({
        status: 200,
        message: 'successfully signed in',
        data: restInfo,
      });
    } else {
      next(errorHandler(402, 'Sign In Failed!, Please Try Again'));
    }
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8)
        + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        userName: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup, signin, google, signOut,
};