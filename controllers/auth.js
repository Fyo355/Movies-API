const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { compare } = require("../utils/handlePassword");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");

const Login = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await usersModel.findOne({ where: { email: body.email } });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const checkPassword = await compare(req.body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 402);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user,
    };

    res.send({ token: data.token, ...data.user.dataValues });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { Login };
