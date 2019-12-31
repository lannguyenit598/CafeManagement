var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var PromotionSchema = new Schema(
    {
        name: String,
        minScore: {
            type: Number,
            default: 0
       },
        discount: {
            type: Number,
            default: 10
        },
        dateFrom: mongoose.Schema.Types.Date,
        dateTo: mongoose.Schema.Types.Date,
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Promotion', PromotionSchema);
