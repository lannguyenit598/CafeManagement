var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var PromotionSchema = new Schema(
    {
        name: String,
        idProductApplied: [
            {
                type: ObjectId,
                ref: 'Products'
            }
        ],
        discount: {
            type: Number,
            default: 10
        },
        dateFrom: mongoose.Schema.Types.Date,
        dateTo: mongoose.Schema.Types.Date,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Promotion', PromotionSchema);
