var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    user: String,
    mail: String,
    password: String,
    size: String,
    poid: Number,
    age: Number,
    sexe: String,
    maladie: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
