const joi = require('joi');

const create = joi.object({
    user: joi.string().trim().length(24).required().messages({
        "string.base": `El usuario debe ser de tipo texto`,
        "string.length": `El usuario debe ser de 24 caracteres`,
        "string.empty": `El usuario es necesario`,
        "any.required": `El usuario es requerido`,
    }),
    products: joi
        .array()
        .items(
            joi.object({
                product: joi.string().trim().length(24).required().messages({
                    "string.base": `El producto debe ser de tipo texto`,
                    "string.length": `El producto debe ser de 24 caracteres`,
                    "string.empty": `El producto es necesario`,
                    "any.required": `El producto es requerido`,
                }),
                quantity: joi.number().required().min(1).max(1000).messages({
                    "number.base": `La cantidad debe ser de tipo númerico`,
                    "number.min": `La cantidad debe tener un valor mínimo de 8`,
                    "number.max": `La cantidad debe tener un valor máximo de 200`,
                    "number.empty": `La cantidad es necesaria`,
                    "any.required": `La cantidad es requerida`,
                }),
            })
        )
        .min(1)
        .max(100)
        .required()
        .messages({
            "array.base": `Los productos deben ser enviados en el formato correcto`,
            "array.min": `Por lo menos debe enviar 1 producto`,
            "array.empty": `Los productos no pueden estar vacios`,
            "any.required": `Los productos son requeridos`,
        }),
})
.messages({ "object.unknown": "El dato enviado no es requerido" });

const update = joi.object({
    products: joi
        .array()
        .items(
            joi.object({
                product: joi.string().trim().length(24).required().messages({
                    "string.base": `El producto debe ser de tipo texto`,
                    "string.length": `El producto debe ser de 24 caracteres`,
                    "string.empty": `El producto es necesario`,
                    "any.required": `El producto es requerido`,
                }),
                quantity: joi.number().required().min(1).max(1000).messages({
                    "number.base": `La cantidad debe ser de tipo númerico`,
                    "number.min": `La cantidad debe tener un valor mínimo de 8`,
                    "number.max": `La cantidad debe tener un valor máximo de 200`,
                    "number.empty": `La cantidad es necesaria`,
                    "any.required": `La cantidad es requerida`,
                }),
            })
        )
        .min(1)
        .max(100)
        .required()
        .messages({
            "array.base": `Los productos deben ser enviados en el formato correcto`,
            "array.min": `Por lo menos debe enviar 1 producto`,
            "array.empty": `Los productos no pueden estar vacios`,
            "any.required": `Los productos son requeridos`,
        }),
})
.messages({ "object.unknown": "El dato enviado no es requerido" });

module.exports = {
    create,
    update
};