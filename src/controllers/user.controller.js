var User = require('../models/user.model.js');
const crypto = require('crypto');

//afficher tout les users

exports.findAll = function(req, res) {
    User.find(function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving users." });
        } else {
            res.send(user);
        }
    });
};

//ajouter un user

exports.create = function(req, res) {

    if (!req.body.user) {
        return res.status(400).send({ message: "veuillez remplir tout les champs" });
    }

    var password = req.body.password.toString();
    password = crypto.createHmac('sha256', password)
        .update('I love cupcakes')
        .digest('hex');
    console.log(password)
    
    var user = new User({ user: req.body.user, mail: req.body.mail, password: password});
    
    user.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error with save user" });
        } else {
            res.send(data);
        }
    });
};

//Connecter un User

exports.connect = function(req, res){
    if(req.body.user == 'test') {
	var password = req.body.password.toString();
	password = crypto.createHmac('sha256', password)
	    .update('I love cupcakes')
	    .digest('hex');
	User.findOne({ 'user': req.body.user, 'password': password }, function(err, user){
	    	    if (user != 0){
		return res.send({ message: "Bonne connexion !" });
	
	    }
	    else {
		console.log('mauvais mdp ou username');
	    }
	    
	})
    }
    else
	return res.status(400).send({message: "Remplissez tout les champs"});
}

//afficher un user specifique

exports.findByName = function(req, res) {

    User.findOne({ 'user': req.params.user }, function (err, user) {
        if (err) {
            console.log(err);
            return res.send({ message: "Bad Name or password !" });
        } else {
            res.send(user);
        }
      });
};

//modifier un user

exports.updateUser = function(req, res) {

    const conditions = { name: req.params.name };

    User.update(conditions, { $set: { mail: 'null', password: '123' }}, function(err) {
        if(err) {
            console.log(err);
            return res.send({ message: "Bad Name." });
        } 
        
        res.send("modification done");
    });
}

//supprimer un user

exports.deleteUser = function(req, res) {
    User.remove({ user: req.params.user }, function (err) {
        if (err) {
            console.log(err);
            return res.send({ message: "Bad Name." });
        }

        res.send("delete");
      });
    
}
