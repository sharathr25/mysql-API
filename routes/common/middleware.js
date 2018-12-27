const { validationResult } = require('express-validator/check');
const logger = require('../../config/logger.js');

function redirectLoginPage(req, res, next) {
  if (req.session.email === undefined) {
    const message = 'requseted page is forbidden click <a href="/login">here</a> to LOGIN';
    res.status(403).send(message);
  } else { next(); }
}

function validate(req, res, next) {
  const keys = Object.keys(req.body);
  let valid = true;
  for (let i = 0; i < keys.length; i += 1) {
    if (req.body[keys[i]].length === 0) {
      valid = false;
      console.log(`${keys[i]} is empty`);
      res.status(401).send(`<strong>${keys[i]}</strong> is empty PLEASE GO BACK AND FILL <strong>${keys[i]}</strong>`);
      break;
    }
  }
  if (valid) { next(); }
}

function cacheClear(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
}

function log(req, res, next) {
  logger.log('info', req.url);
  next();
}

function check(req, res, next) {
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
module.exports = {
  validateForm: validate,
  redirectLogin: redirectLoginPage,
  clearCache: cacheClear,
  logUrl: log,
  checkErrors: check,
};
