const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('user');
const validateModel = require('../validateModel');
const { Encrypt, ErrorResult, Result } = require('../Utils/helpers');

const login = async (req, res) => {
    const { userName, password } = req.body;

    //validate login model
    const errors = await validateModel.ValidateLogin(userName, password);
    if (errors) return ErrorResult(res, errors);

    //Check if user exist
    const user = await User.findOne({
        userName,
        password: Encrypt(password),
    });

    //should sign and return a JWT to the client , instead of storing the token in the user model..

    if (!user) {
        return ErrorResult(res, 'Your login information is incorrect');
    }

    //customize response

    user.password = undefined;

    return Result(res, 'user', user);
};

const register = async (req, res) => {
    const { userName, password, nickName } = req.body;

    //validation
    const errors = await validateModel.ValidateUser(req.body);
    if (errors) return ErrorResult(res, errors);

    //Create User
    const userObject = new User({
        userName,
        nickName,
        password: Encrypt(password),
    });

    User.collection.insertOne(userObject, (err, result) => {
        //check if mongodb return any error
        if (err != null) {
            return ErrorResult(res, 'We encountered an error: ' + err);
        } else {
            //user inserted
            const insertedUser = result.ops[0];

            return Result(res, 'user', insertedUser);
        }
    });
};

const deleteUser = async (req, res) => {
    const { deleteUserId, token } = req.body;

    //validation
    const errors = await validateModel.ValidateDeleteUser(deleteUserId, token);
    if (errors) return ErrorResult(res, errors);

    //try to remove the user
    const c = await User.collection.findOneAndDelete({
        _id: ObjectId(deleteUserId),
    });
    if (c && c.value) return Result(res);

    return ErrorResult(
        res,
        'Encountered an error, please make sure the user exists'
    );
};

const getUsers = async (req, res) => {
    const { token } = req.body;
    let { query } = req.body;

    //validation
    const errors = await validateModel.ValidateAdminToken(token);
    if (errors) return ErrorResult(res, errors);

    if (query === undefined) query = {};

    //try to remove the user
    User.find(query, function (err, users) {
        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }

        return Result(res, 'users', users);
    });
};

const getUserByToken = async (req, res) => {
    const { token } = req.body;

    //validation
    if (!token) return ErrorResult(res, 'You must send token');

    //try get user by token
    User.findOne({ token }, function (err, user) {
        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }
        return Result(res, 'user', user);
    });
};

module.exports = { login, register, deleteUser, getUsers, getUserByToken };
