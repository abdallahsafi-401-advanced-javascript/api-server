module.exports = (req, res, next) => {
  console.log(`
    __REQUEST__
    Time: ${req.requestTime}
    Method: ${req.method}
    Path: ${req.path}
    `);
  next();
};
