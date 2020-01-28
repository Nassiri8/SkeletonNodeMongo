var Schema = require('../models/dialog.model.js');

console.log("API FAIL because no route dialog");
//Recuperer les questions

exports.findRes =function(req, res){
    dialog.find(function(err,  dialog){
	if(err){
	    console.log(err);
	}
    headers = {
	'Authorization': 'Bearer d9cd5472214d43d7bd0a928a7d3228aa',
    };
    fetch('https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=fr&query=apple', headers).then(res => res.json());
    });
}

//Envoyer dans la Bdd la reponse et a dialog flow
