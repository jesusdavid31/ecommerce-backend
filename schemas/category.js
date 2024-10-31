const joi = require('joi');

// Verifica la estrutura de la colecion a actualizar de Matriculados
const create = joi.object({
    name: joi.string().trim().required().min(8).max(200).messages({
        "string.base": `El nombre debe ser de tipo texto`,
        "string.min": `El nombre debe tener mínimo 8 caracteres`,
        "string.max": `El nombre debe tener máximo 200 caracteres`,
        "string.empty": `El nombre es necesario`,
        "any.required": `El nombre es requerido`,
    }),
});

const update = joi.object({
    name: joi.string().trim().optional().min(8).max(200).messages({
        "string.base": `El nombre debe ser de tipo texto`,
        "string.min": `El nombre debe tener mínimo 8 caracteres`,
        "string.max": `El nombre debe tener máximo 200 caracteres`,
        "string.empty": `El nombre es necesario`,
        "any.required": `El nombre es requerido`,
    }),
    is_active: joi.boolean().optional(),
});

module.exports = {
    create,
    update
};