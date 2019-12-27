var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        name: String,
        price: {
            type: Number,
            default: 10000
        },
        quantity: {
            type: Number,
            default: 0
        },
        description: String,
        idTypeProduct: {
            type: ObjectId,
            ref: 'TypeProducts'
        },
        idOrigin: {
            type: ObjectId,
            ref: 'Origin'
        },
        img: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', ProductSchema);
