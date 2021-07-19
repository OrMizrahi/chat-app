const sha1 = require('sha1');

const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('user');

//Encrpy plaintext -> used for password
exports.Encrypt = (plainText) => {
    return sha1(plainText);
};

//Error Results contains message + code =0 (default)
exports.ErrorResult = (responeCallBack, errorMessage, code = 0) => {
    //check if there is multi error requests
    if (Array.isArray(errorMessage)) errorMessage = errorMessage.join('\n');

    const errorObject = {
        code: code,
        errorMessage: errorMessage,
    };

    return responeCallBack.json(errorObject);
};

//Success result return Code =1 and Object
exports.Result = (responeCallBack, key, object) => {
    let result = { code: 1, errorMessage: '' };

    if (key !== undefined && object !== undefined) {
        result[key] = object;
    }
    return responeCallBack.json(result);
};

exports.getUserByFilter = async (_id, token) => {
    filterObject = {};

    if (token) filterObject.token = token;
    if (_id) filterObject._id = _id;

    //check that filterObject is not empty
    if (Object.keys(filterObject).length === 0) return null;

    const user = await User.collection.findOne(filterObject);

    return user;
};

//This method invoked only when we first create the database
exports.initialSeedDB = () => {
    //Create first User/Admin
    let newUser = {};
    newUser.nickName = 'messi';
    newUser.userName = 'messi';
    newUser.password = this.Encrypt('1234');
    newUser.isAdmin = true;

    User.collection.insertOne(new User(newUser), (err) => {
        if (err != null) {
            console.error('Cannot Create User', err);
            return false;
        }
    });

    //Create Main Room
    let newRoom = {
        name: 'General',
        chats: [],
    };

    Room.collection.insertOne(new Room(newRoom), (err) => {
        if (err != null) {
            console.error('Cannot Create Room', newRoom);
            return false;
        }
    });
};
