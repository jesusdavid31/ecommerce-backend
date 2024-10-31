const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { getProducts, saveProduct, updateProduct } = require("../../controllers/products/product");
const { validatorObject } = require("../../middlewares/validate-joi");
const { create, update } = require("../../schemas/product");

const router = Router();

router.get("/get-products", validateJWT, getProducts);

router.post(
    "/create",
    [validateJWT, validatorObject(create)],
    saveProduct
);

router.put(
    "/update/:productId",
    [validateJWT, validatorObject(update)],
    updateProduct
);

module.exports = router;
