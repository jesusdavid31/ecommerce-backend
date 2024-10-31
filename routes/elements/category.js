const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { getCategories, saveCategory, updateCategory } = require("../../controllers/category/category");
const { validatorObject } = require("../../middlewares/validate-joi");
const { create, update } = require("../../schemas/category");

const router = Router();

router.get("/get-categories", validateJWT, getCategories);

router.post(
    "/create",
    [validateJWT, validatorObject(create)],
    saveCategory
);

router.put(
    "/update/:categoryId",
    [validateJWT, validatorObject(update)],
    updateCategory
);

module.exports = router;
