const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
'use strict';

//cryptage pwd
const crypto = require('crypto');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//option cors

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//code pour crypter en sha512

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
	salt:salt,
	passwordHash:value
    };
};

//routes:
require('./src/routes/user.routes.js')(app);
require('./src/routes/dialog.routes.js')(app);

// listen for requests
app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});
