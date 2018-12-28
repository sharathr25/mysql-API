const { check, validationResult } = require('express-validator/check');
const logger = require('../../config/logger.js');

function redirectLoginPage(req, res, next) {
  if (req.session.email === undefined) {
    const message = 'requseted page is forbidden click <a href="/login">here</a> to LOGIN';
    res.status(403).send(message);
  } else { next(); }
}

function cacheClear(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
}

function log(req, res, next) {
  logger.log('info', req.url);
  next();
}

function checkErr(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arr = errors.array();
    let message = '';
    for (let i = 0; i < arr.length; i += 1) {
      message += `${arr[i].msg} <br>`;
    }
    res.status(401).send(message);
  } else { next(); }
}

const signupMiddlewares = [
  check('username').isLength({ min: 3 }).withMessage('Username shoud be more than 4 characters'),
  check('email').isEmail().withMessage('email not correct'),
  check('password').isLength({ min: 3 }).withMessage('password should me more than 4 charactes'),
  check('password1').isLength({ min: 3 }).withMessage('re-entered password should me more than 4 charactes'),
  checkErr,
];

const loginMiddlewares = [
  check('email').isEmail().withMessage('email not correct'),
  check('password').isLength({ min: 3 }).withMessage('password should me more than 4 charactes'),
  checkErr,
];

module.exports = {
  redirectLogin: redirectLoginPage,
  clearCache: cacheClear,
  logUrl: log,
  checkErrors: checkErr,
  validateSignUp: signupMiddlewares,
  validateLogin: loginMiddlewares,
};
