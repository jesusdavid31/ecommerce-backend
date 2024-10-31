const {
  response
} = require("express");

const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateJWT
} = require("../../helpers/jwt");
const {
  serverErrors
} = require("../../errors/errors");

const login = async (req, res = response) => {

  const {
    email,
    password
  } = req.body;

  try {

    // Verificar usuario
    let userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(400).json({
          ok: false,
          msg: 'Invalid username or password puto one piece'
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid identification number or password",
      });
    }

    // Generar el TOKEN - JWT
    const token = await generateJWT(userDB._id, userDB.full_name, userDB.email);

    res.json({
      ok: true,
      _id: userDB._id,
      full_name: userDB.full_name,
      email: userDB.email,
      token,
    });

  } catch (error) {
    res.status(500).json(serverErrors.INTERNALSERVERERROR);
  }

};

const renewToken = async (req, res = response) => {

  try {
    // Leer el Token
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "Error al renovar la sesión, por favor inicia sesión nuevamente.",
      });
    }

    const tokenData = jwt.decode(token, {
      complete: true
    });

    const {
      _id,
      full_name,
      email
    } = tokenData.payload;

    // Generar JWT
    const result = await generateJWT(_id, full_name, email);

    res.json({
      ok: true,
      uid: _id,
      full_name,
      email,
      token: result,
    });
    
  } catch (error) {
    res.status(500).json(serverErrors.INTERNALSERVERERROR);
  }

};

module.exports = {
  login,
  renewToken,
};