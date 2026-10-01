const validate = (fields) => (req, res, next) => {
  const body = req.body || {};
  const missing = fields.filter((field) => !body[field]);
  if (missing.length > 0) {
    return res.status(400).json({ message: "Missing fields: " + missing.join(", ") });
  }
  next();
};

module.exports = validate;
