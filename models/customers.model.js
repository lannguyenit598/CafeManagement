var mongoose = require('mongoose');
// var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
    {
        name: String,
        phone: String,
        email: String,
        score: Number
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Origin', CustomerSchema);
