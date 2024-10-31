const joi = require('joi');

// Verifica la estrutura de la colecion a actualizar de Matriculados
const create = joi.object({
    title: joi.string().trim().required().min(8).max(200),
    price: joi.number().required().min(1).max(10000000),
    description: joi.string().trim().required().min(8).max(400),
    category: joi.string().trim().required().length(24),
    image: joi.string().trim().required().min(8).max(200),
});

const update = joi.object({
    title: joi.string().trim().optional().min(8).max(200),
    price: joi.number().optional().min(1).max(10000000),
    description: joi.string().trim().optional().min(8).max(400),
    category: joi.string().trim().optional().length(24),
    image: joi.string().trim().optional().min(8).max(200),
    is_active: joi.boolean().optional(),
});

module.exports = {
    create,
    update
};