/* eslint-disable no-console */
// external import
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// internal import
const authRouter = require('./routes/authRouter');
const defaultErrorHandler = require('./middlewires/common/defaultErrorHandler');

// for secrete key, password ect.
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// database connection using mongoose
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('database connected successfully');
  } catch (error) {
    throw new Error(error);
  }
};
dbConnection();

// middlewares
// request parser from express.js.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// parse cookie middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// routes
app.use('/api/auth', authRouter);

// default error handler
app.use(defaultErrorHandler);