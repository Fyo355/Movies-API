const { moviesModel } = require("../models");
const { genreModel } = require("../models");
const { Op } = require("sequelize");

const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let order = req.query.order || "rating,asc";
    const parseOrder = (order) => {
      // Verifica que el formato del campo "order" sea correcto
      const orderFields = order.split(",");
      if (orderFields.length !== 2) {
        throw new Error("Invalid order format");
      }

      const [field, direction] = orderFields;

      // Verifica que el valor de dirección sea válido
      if (direction !== "asc" && direction !== "desc") {
        throw new Error("Invalid order direction");
      }

      // Devuelve el campo y la dirección de ordenamiento en formato Sequelize
      return [[field, direction]];
    };

    let genre = req.query.genre;

    // Construye la consulta Sequelize
    let query = {
      offset: page * limit,
      limit: limit,
      order: parseOrder(order),
      where: {},
      include: [],
    };

    // Si genre es diferente a "All", se añade a la consulta como filtro
    if (genre) {
      // Separa los géneros en un array
      const genres = genre.split(",");
      // Añade un filtro para cada género
      query.where.genre = {
        [Op.or]: genres.map((g) => ({ [Op.like]: `%${g.trim()}%` })),
      };
    }
    // Si search no está vacío, se añade a la consulta como filtro
    if (search) {
      query.where.name = { [Op.like]: `%${search}%` };
    }

    // Ejecuta la consulta Sequelize
    const movies = await moviesModel.findAndCountAll(query);

    // Obtiene el nombre de los géneros
    const genres = await genreModel.findAll({
      attributes: ["name"],
      distinct: true,
    });

    // Crea un array con los nombres de los géneros
    const data_name = genres.map((genre) => genre.name);

    // Crea la respuesta con la información necesaria
    const response = {
      error: false,
      total: movies.count,
      page: page + 1,
      limit,
      genres: data_name,
      movies: movies.rows.map((movie) => {
        const movieData = movie.dataValues;
        return {
          id: movieData.id,
          name: movieData.name,
          img: movieData.img,
          year: movieData.year,
          genre: JSON.parse(movieData.genre),
          rating: movieData.rating,
        };
      }),
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, img, year, genre, rating } = req.body;
    const newMovie = await moviesModel.create({
      name,
      img,
      year,
      genre,
      rating,
    });
    res.status(201).json({ error: false, movie: newMovie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { name, img, year, genre, rating } = req.body;
    const { id } = req.params;
    const updatedMovie = await moviesModel.update(
      { name, img, year, genre, rating },
      { where: { id } }
    );
    if (updatedMovie[0]) {
      res
        .status(200)
        .json({ error: false, message: "Movie updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await moviesModel.destroy({ where: { id } });
    if (deletedMovie) {
      res
        .status(200)
        .json({ error: false, message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ error: true, message: "Movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { getItems, createItem, updateItem, deleteItem };
