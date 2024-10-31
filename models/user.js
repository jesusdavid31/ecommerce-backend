/* eslint-disable no-unused-vars */
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true
});

//Esto es para fines visuales y no afecta a la base de datos
UserSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
});

module.exports = model('User', UserSchema);