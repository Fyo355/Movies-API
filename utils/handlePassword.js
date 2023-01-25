const bcryptjs = require("bcryptjs");

/**
 *
 * @param {*} textPlain
 */
const encrypt = async (textPlain) => {
  const hash = await bcryptjs.hash(textPlain, 10);
  return hash;
};

/**
 *
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */

const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
