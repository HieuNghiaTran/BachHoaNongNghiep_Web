
var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        colection: String,
        id_catory: String
    }
);

var Colection = mongoose.model('Colection', schema, 'Colection');

module.exports = Colection;