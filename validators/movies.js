const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateMovieCreate = [
  check("name").exists().notEmpty(),
  check("img").exists().notEmpty().isURL(),
  check("year").exists().notEmpty(),
  check("genre")
    .exists()
    .notEmpty()
    .custom((value) => {
      // convertir el valor en un array
      const genres = JSON.parse(value);
      // verificar si el array tiene solo 2 elementos
      if (genres.length !== 2) {
        throw new Error("Debe tener solo dos generos");
      }
      // verificar que los elementos del array se encuentren en la lista de géneros permitidos
      const allowedGenres = [
        "Drama",
        "Crime",
        "Action",
        "Adventure",
        "Romance",
        "Fantasy",
        "Thriller",
        "Sci-fi",
        "Music",
        "Family",
      ];
      genres.forEach((genre) => {
        if (!allowedGenres.includes(genre)) {
          throw new Error(`${genre} no es un genero valido`);
        }
      });
      return true;
    }),
  check("rating").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateMovieUpdate = [
  check("id").exists().isInt(),
  check("name").exists().notEmpty(),
  check("img").exists().notEmpty().isURL(),
  check("year").exists().notEmpty(),
  check("genre")
    .exists()
    .notEmpty()
    .custom((value) => {
      // convertir el valor en un array
      const genres = JSON.parse(value);
      // verificar si el array tiene solo 2 elementos
      if (genres.length !== 2) {
        throw new Error("Debe tener solo dos generos");
      }
      // verificar que los elementos del array se encuentren en la lista de géneros permitidos
      const allowedGenres = [
        "Drama",
        "Crime",
        "Action",
        "Adventure",
        "Romance",
        "Fantasy",
        "Thriller",
        "Sci-fi",
        "Music",
        "Family",
      ];
      genres.forEach((genre) => {
        if (!allowedGenres.includes(genre)) {
          throw new Error(`${genre} no es un genero valido`);
        }
      });
      return true;
    }),
  check("rating").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateId = [
  check("id").exists().isInt(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateId, validateMovieCreate, validateMovieUpdate };
