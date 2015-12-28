var ApplicationError=require('./ApplicationErrors');
function getUserById(id, callback){
	if(!id){
		return callback(new Error('Id is require'));
	}

	if(id>10){
		return callback(new ApplicationError.Database('ID can\'t be higher than 10'));
	}
	callback(null, {name:'Harry'});
}
function onGetUserById(err, resp){
	if(err){
		return console.log(err.toString());
	}
	console.log('Success: ',resp.name);
}
getUserById(1, onGetUserById);
getUserById(null, onGetUserById);
getUserById(53, onGetUserById);