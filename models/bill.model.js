var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var BillSchema = new Schema(
    {
        total: {
            type: Number,
            default: 10000
        },
        date: {
            type: mongoose.Schema.Types.Date,
            default: new Date()
        },
        idPromotion: {
            type: ObjectId,
            ref: 'Promotion'
        },
        idCustomer: {
            type: ObjectId,
            ref: 'Customer'
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bill', BillSchema);
