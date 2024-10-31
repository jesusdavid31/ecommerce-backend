const { Router } = require("express");
const router = Router();

const routePathV1 = "/api";

router.use(`${routePathV1}/auth`, require("./elements/auth.js"));
router.use(`${routePathV1}/users`, require("./elements/user.js"));
router.use(`${routePathV1}/categories`, require("./elements/category.js"));
router.use(`${routePathV1}/products`, require("./elements/product.js"));
router.use(`${routePathV1}/sales`, require("./elements/sale.js"));

module.exports = { router };
