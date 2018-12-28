module.exports = function redirectLogin(req, res, next) {
  if (req.session.email === undefined) {
    const message = 'requseted page is forbidden click <a href="/login">here</a> to LOGIN';
    res.status(403).send(message);
  } else { next(); }
};
