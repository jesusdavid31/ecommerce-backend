/* eslint-disable no-unused-vars */
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    image: {
        type: String,
        required: true
    },
    total_sample_sum: {
        type: Number,
        required: true,
        default: 0
    },
    sample_size: {
        type: Number,
        required: true,
        default: 0
    },
    average: {
        type: Number,
        required: true,
        default: 0
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

ProductSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Product', ProductSchema);