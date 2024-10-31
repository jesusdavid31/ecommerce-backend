// verficar si es shemas de array de json es valido
const validatorArrayOfObject = (schema, fileData) => {
  let result = false;
  const { error } = schema.validate(fileData);

  if (error !== undefined) {
    result = true;
  }

  return result;
};

// verficar si es shemas de json es valido
const validatorObject = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error === undefined) return next();

  const { details } = error;

  const message = details
    .map((item) => item.message.replace(/['"]+/g, ""))
    .join(",");

  return res.status(400).json({
    statusCode: 410,
    ok: false,
    message,
  });
};

module.exports = {
  validatorArrayOfObject,
  validatorObject,
};
