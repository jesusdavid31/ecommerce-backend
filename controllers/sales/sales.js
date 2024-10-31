const { response } = require('express');
const Sale = require('../../models/sale');
const { serverErrors } = require("../../errors/errors");

const getSales = async(req, res = response) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        let statusFilter = req.query.is_active || "true";
        console.log('Entrando al metodo');

        statusFilter === "true" ? (statusFilter = true) : (statusFilter = false);

        const result = await Sale.aggregate([
            {
                $facet: {
                    sales: [

                        { "$unwind": "$products" },

                        {
                            $lookup: {
                                from: "products",
                                localField: "products.product",
                                foreignField: "_id",
                                as: "products.product"
                            }
                        },

                        { "$unwind": "$products.product" },
                        
                        { "$group": {
                            "_id": "$_id",
                            "products": { "$push": "$products" }
                        }},

                        {
                            $lookup: {
                                from: "sales",
                                localField: "_id",
                                foreignField: "_id",
                                as: "orderDetails"
                            }
                        },

                        { "$unwind": "$orderDetails" },

                        {
                            $addFields: {
                                'orderDetails.products': '$products'
                            }
                        },

                        {
                            $replaceRoot: {
                                newRoot: '$orderDetails'
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

        // console.log(result);

        res.json({
            ok: true,
            data: result[0] ?? null,
            // dataNumber: 0
        });

    } catch (error) {
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }
    
};

const saveSale = async(req, res = response) => {

    const sale = new Sale(req.body);

    try {

        // Guardar venta
        await Sale.create(sale);

        res.json({
            ok: true,
            msg: 'Venta creada con éxito'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(serverErrors.INTERNALSERVERERROR);
    }

};

const updateSale = async(req, res = response) => {

    const categoryId = req.params.categoryId;

    try {

        const result = await Sale.updateOne(
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
    getSales,
    saveSale,
    updateSale
};