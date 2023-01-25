const express = require("express");
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const genreStringMiddleware = require("../middleware/string");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/movies");
const {
  validateId,
  validateMovieCreate,
  validateMovieUpdate,
} = require("../validators/movies");
const router = express.Router();

router
  .get("/movies", authMiddleware, authRolMiddleware(["normal"]), getItems)
  .get("/movies", authMiddleware, authRolMiddleware(["business"]), getItems)
  .post(
    "/movies",
    authMiddleware,
    authRolMiddleware(["business"]),

    genreStringMiddleware,
    validateMovieCreate,
    createItem
  )
  .put(
    "/movies/:id",
    authMiddleware,
    authRolMiddleware(["business"]),
    genreStringMiddleware,
    validateMovieUpdate,
    updateItem
  )
  .delete(
    "/movies/:id",
    authMiddleware,
    authRolMiddleware(["business"]),
    validateId,
    deleteItem
  );

module.exports = router;
