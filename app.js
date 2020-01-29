const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//const fetch = require('node-fetch');
'use strict';

const CONNECTION_URL = "mongodb+srv://nour:nour@nourtest-7owds.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "test";
//cryptage pwd
const crypto = require('crypto');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(CONNECTION_URL);

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

app.get('/', function (req, res, test) {
    console.log(test)
    res.json({
        status: 'API Its Working',
        message: 'Welcome to AdriverAPI!'
    });
});

// listen for requests
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        //collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        console.log("Server is listening on port 3000");
    });
});
