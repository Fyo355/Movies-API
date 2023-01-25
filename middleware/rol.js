const { verifyToken } = require("../utils/handleToken");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const { usersModel } = require("../models");

const authRolMiddleware = (roles) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleErrorResponse(res, "NOT_ALLOW", 409);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await usersModel.findOne({ where: { id: tokenData.id } });

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      handleErrorResponse(res, "NOT_ROL", 409);
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = authRolMiddleware;
