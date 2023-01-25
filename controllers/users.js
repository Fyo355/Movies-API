const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { encrypt } = require("../utils/handlePassword");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");

const getUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.send({ data: users });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findOne({ where: { id } });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_FOUND", 404);
      return;
    }
    res.send({ data: user });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const createUser = async (req, res) => {
  try {
    const body = matchedData(req);
    const checkIsExist = await usersModel.findOne({
      where: { email: body.email },
    });
    if (checkIsExist) {
      handleErrorResponse(res, "USER_EXISTS", 401);
      return;
    }
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    const data = await usersModel.create(bodyInsert);

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const updateUser = async (req, res) => {
  try {
    const body = matchedData(req);
    const password = await encrypt(body.password);
    const bodyUpdate = { ...body, password };
    const data = await usersModel.update(bodyUpdate, {
      where: { id: body.id },
    });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findOne({ where: { id } });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_FOUND", 404);
      return;
    }
    await user.destroy();
    res.send({ message: "Usuario eliminado exitosamente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
