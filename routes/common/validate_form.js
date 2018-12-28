function validateForm(req, res, next) {
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

module.exports = {
  validate: validateForm,
};
