const { Router } = require("express");
// const { validateJWT } = require("../../middlewares/validate-jwt");
const { login } = require("../../controllers/auth/auth");
// const { createUser } = require("../../controllers/users/user");
const { validatorObject } = require("../../middlewares/validate-joi");
// const { newUser } = require("../../schemas/users/user");
const { auth } = require("../../schemas/auth");

const router = Router();

router.post("/login", [validatorObject(auth)], login);

// router.post(
//   "/register-user",
//   validateJWT,
//   [validatorObject(newUser)],
//   createUser
// );

// router.get("/renew", renewToken);

module.exports = router;
