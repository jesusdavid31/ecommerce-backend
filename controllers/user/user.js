//El const { response } = require('express') sirve simplemente para ayudar a completar codigo typescript
const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const { generateJWT } = require("../../helpers/jwt");
const { serverErrors } = require("../../errors/errors");

const createUser = async (req, res = response) => {
  
  const { email, password } = req.body;

  try {

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await User.create(user);

    // Generar el TOKEN - JWT
    const token = await generateJWT(user.id, user.full_name, user.email);

    res.json({
      ok: true,
      user,
      token,
    });

  } catch (error) {
    return res.status(500).json(serverErrors.INTERNALSERVERERROR);
  }
};

module.exports = {
  createUser
};
