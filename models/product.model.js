var mongoose = require('mongoose');
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
        description: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Origin', ProductSchema);
