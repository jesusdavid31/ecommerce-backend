const { Router } = require("express");
// const { validateJWT } = require("../../middlewares/validate-jwt");

const { createUser } = require("../../controllers/user/user");
const { validatorObject } = require("../../middlewares/validate-joi");
const { newUser } = require("../../schemas/users/user");

const router = Router();

router.post(
  "/register-user",
  [validatorObject(newUser)],
  createUser
);

module.exports = router;
