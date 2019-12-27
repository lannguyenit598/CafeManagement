var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var BillDetailSchema = new Schema(
    {
        quantity: {
            type: Number,
            default: 1
        },
        idProduct: {
            type: ObjectId,
            ref: 'products'
        },
        idBill: {
            type: ObjectId,
            ref: 'bills'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', BillDetailSchema);
