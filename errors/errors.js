const apiErrors = {
    UPDATEEXAMSERROR: {
        ok: false,
        msg: 'No se pudo actualizar el examen',
        errorCode: 'B001'
    }
};

const serverErrors = {
    INTERNALSERVERERROR: {
        ok: false,
        msg: 'Se ha producido un error',
        errorCode: 'E001'
    }
};

module.exports = {
    apiErrors,
    serverErrors
};