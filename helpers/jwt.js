const jwt = require('jsonwebtoken');

const generateJWT = (_id, full_name, email) => {

    return new Promise((resolve, reject) => {

        const payload = {
            _id,
            full_name,
            email
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }

        });

    });

};

module.exports = {
    generateJWT
};