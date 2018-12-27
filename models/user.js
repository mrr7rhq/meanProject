const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById =function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername=(username,callback)=>{
    const query = {username: username}
    User.findOne(query,callback);

}

module.exports.addUser=function(newUser,callback){

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);


        });
        
    });

}
// this is the actual function to compare the input password and hased password in 
//database. return boolean isMatch 
module.exports.comparePassword = function( candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => { 
        if(err)
        return done(err);//I do not know why throw not working here
        callback(null, isMatch);
    });
}