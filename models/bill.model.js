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
            ref: 'Promotions'
        },
        idCustomer: {
            type: ObjectId,
            ref: 'customers'
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bill', BillSchema);
