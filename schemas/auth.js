const joi = require('joi');

// Verifica la estrutura de la colecion a actualizar de Matriculados
const auth = joi.object({
    email: joi.string().required().min(8).max(64),
    password: joi.string().required().min(8).max(64),
});

module.exports = {
    auth
};