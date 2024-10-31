const { response } = require('express');
const Category = require('../../models/category');
const { serverErrors } = require("../../errors/errors");

const getCategories = async(req, res = response) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        let statusFilter = req.query.is_active || "true";

        statusFilter === "true" ? (statusFilter = true) : (statusFilter = false);

        const result = await Category.aggregate([
            {
                $facet: {
                    categories: [
                        {
                            $match: { is_active: statusFilter },
                        },
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },
                        {
                            $skip: (page - 1) * limit,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                    totalDocuments: [
                        {
                            $match: { is_active: statusFilter },
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $count: {} },
                            },
                        },
                    ],
                },
            },
            { $unwind: { path: "$totalDocuments" } },
        ]);

        res.json({
            ok: true,
            data: result[0] ?? null
        });

    } catch (error) {
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }
};

const saveCategory = async(req, res = response) => {

    const category = new Category(req.body);

    try {

        // Guardar categoria
        await Category.create(category);

        res.json({
            ok: true,
            msg: 'Categoría creada con éxito'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }

};

const updateCategory = async(req, res = response) => {

    const categoryId = req.params.categoryId;

    try {

        const result = await Category.updateOne(
            { _id: categoryId },
            { $set: req.body }
        );

        if (result?.modifiedCount === 1) {
            res.status(200).json({
                ok: true,
            });
        } else {
            res.status(400).json({
                ok: false,
                msg: "An error has occurred",
            });
        }

    } catch (error) {
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }

};

module.exports = {
    getCategories,
    saveCategory,
    updateCategory
};