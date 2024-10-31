/* eslint-disable no-unused-vars */
const { Schema, model } = require('mongoose');

const ItemSchema = Schema({
    product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true
    }
});

const SaleSchema = Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [ItemSchema],
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
SaleSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Sale', SaleSchema);