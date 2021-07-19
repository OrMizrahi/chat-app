const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const userSchema = new Schema({
    nickName: { type: String },
    userName: { type: String, index: true, unique: true },
    password: String,
    dateCreated: { type: Date, default: () => new Date() },
    //need to refactor to JWT and not save in database
    token: {
        type: String,
        default: () => uuid.v4(),
        index: true,
        unique: true,
    },
    //id-> jwt should sign this, so we can decrypt user id from it
    isAdmin: { type: Boolean, default: false },
});

mongoose.model('user', userSchema);
