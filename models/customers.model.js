var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
    {
        name: String,
        phone: String,
        email: String,
        score: {
            type: Number,
            default: 0
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customer', CustomerSchema);
