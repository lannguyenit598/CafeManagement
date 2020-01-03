var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
import {STAFF, SALT_ROUNDS} from '../utils/constanst'

// staff / admin account information
var UserSchema = new Schema(
    {
        name: String,
        phone: String,
        address: String, 
        email: String,
        password: String,
        typeUser: {
            type: String,
            default: STAFF
        }
    }, 
    {
        timestamps: true
    }
);

UserSchema.methods.setPassword = function (password) {
    this.passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
