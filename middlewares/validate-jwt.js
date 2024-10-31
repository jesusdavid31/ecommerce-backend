const jwt = require("jsonwebtoken");


const validateJWT = (req, res, next) => {
  // Leer el Token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { _id, full_name, email } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = _id;
    req.full_name = full_name;
    req.email = email;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
