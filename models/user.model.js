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
            ref: 'Product'
        },
        idBill: {
            type: ObjectId,
            ref: 'Bill'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', BillDetailSchema);
