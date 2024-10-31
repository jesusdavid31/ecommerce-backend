/* eslint-disable no-unused-vars */
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
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
CategorySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Category', CategorySchema);