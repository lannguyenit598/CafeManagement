var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OriginSchema = new Schema(
    {
        name: String,
        information: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Origin', OriginSchema);
