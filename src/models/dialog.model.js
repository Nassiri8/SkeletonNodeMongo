var mongoose = require('mongoose');

var DialogSchema = mongoose.Schema({
    value: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Dialog', DialogSchema);
