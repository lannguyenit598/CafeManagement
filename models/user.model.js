var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;
import {STAFF} from '../utils/constanst'

// staff / admin account information
var UserSchema = new Schema(
    {
        name: String,
        phone: String,
        address: String, 
        email: String,
        password: String,
        typeUser: {
            type: Number,
            default: STAFF
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
