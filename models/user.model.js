var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
