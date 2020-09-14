module.exports = (req, res, next) => {
  let date = new Date();
  req.requestTime = date.toLocaleString();
  next();
};