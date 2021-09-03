const moongose = require('mongoose');

const Schema = moongose.Schema;


// create the user Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },


    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = User = moongose.model('users', UserSchema)