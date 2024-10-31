const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { getSales, saveSale, updateSale } = require("../../controllers/sales/sales");
const { validatorObject } = require("../../middlewares/validate-joi");
const { create, update } = require("../../schemas/sale");

const router = Router();

router.get("/get-sales", validateJWT, getSales);

router.post(
    "/create",
    [validateJWT, validatorObject(create)],
    saveSale
);

router.put(
    "/update/:categoryId",
    [validateJWT, validatorObject(update)],
    updateSale
);

module.exports = router;
