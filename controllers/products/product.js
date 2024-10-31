const { response } = require('express');
const Product = require('../../models/product');
const { serverErrors } = require("../../errors/errors");

const getProducts = async(req, res = response) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        let statusFilter = req.query.is_active || "true";

        statusFilter === "true" ? (statusFilter = true) : (statusFilter = false);

        const result = await Product.aggregate([
            {
                $facet: {
                    products: [
                        {
                            $lookup: {
                                from: "categories",
                                localField: "category",    // field in the orders collection
                                foreignField: "_id",  // field in the items collection
                                as: "categoria"
                            }
                        },
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
                        // { $group : { _id : "$title" } },
                        // { $project : { 
                        //     title: 1, 
                        //     categoria : 1, 
                        //     price: 1 
                        // }},
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
            data: result[0] ?? null,
        });

    } catch (error) {
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }
};

const saveProduct = async(req, res = response) => {

    const product = new Product(req.body);

    try {

        // Guardar producto
        await Product.create(product);

        res.json({
            ok: true,
            msg: 'Producto creado con éxito'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }

};

const updateProduct = async(req, res = response) => {

    const productId = req.params.productId;

    try {

        const result = await Product.updateOne(
            { _id: productId },
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
    getProducts,
    saveProduct,
    updateProduct
};