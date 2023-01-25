const genreStringMiddleware = (req, res, next) => {
  const { genre } = req.body;
  if (Array.isArray(genre)) {
    req.body.genre = JSON.stringify(genre);
  }
  next();
};

module.exports = genreStringMiddleware;
