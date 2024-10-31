const joi = require('joi');

// Verifica la estrutura de la colecion a actualizar de Matriculados
const newUser = joi.object({
    full_name: joi.string().required().min(5).max(64),
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }).min(5).max(64),
    password: joi.string().required().min(5).max(64),
});

module.exports = {
    newUser
};