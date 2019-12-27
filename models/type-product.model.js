var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeProductSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('TypeProduct', TypeProductSchema);
