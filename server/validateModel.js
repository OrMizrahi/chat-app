const { ErrorResult, getUserByFilter } = require('./Utils/helpers');
const mongoose = require('mongoose');
require('./models/User');
require('./models/Room');
const User = mongoose.model('user');
const Room = mongoose.model('room');

const ValidateUser = async (body) => {
    const { userName, password, nickName } = body;
    let errors = [];

    //check that fields exists and not empty
    if (userName === undefined || userName.length == 0)
        errors.push('Please enter Username');
    if (password === undefined || password.length == 0)
        errors.push('Please enter Password');
    if (nickName === undefined || nickName.length == 0)
        errors.push('Please enter NickName');

    //check size of length
    if (userName.length < 2 || userName.length > 10)
        errors.push('Please enter valid Username between 2 to 10 chars');
    if (password.length < 4 || password.length > 16)
        errors.push('Please enter valid Password between 4 to 16 chars');
    if (nickName.length > 20)
        errors.push('Please enter valid Password Maximum 20 chars');
    if (errors.length > 0) return errors;

    //Check if username exist
    const isUserExist = await User.findOne({ userName }).exec();
    if (isUserExist) return `UserName : ${userName}, Already Exists`;

    //Check if nickname exist
    const isNicknameExist = await User.findOne({ nickName }).exec();
    if (isNicknameExist) return `Nickname : ${nickName}, Already Exists`;

    //no errors
    return null;
};

const ValidateLogin = async (userName, password) => {
    let errors = [];

    //check that fields exists and not empty
    if (userName === undefined || userName.length == 0)
        errors.push('Please enter Username');
    if (password === undefined || password.length == 0)
        errors.push('Please enter Password');

    if (errors.length > 0) return errors;

    //no errors
    return null;
};

const ValidateDeleteUser = async (deleteUserId, token) => {
    //check that fields exists and not empty
    if (!deleteUserId)
        return 'The user could not be deleted. A proper schema must be sent';
    if (!token)
        return 'The user could not be deleted. A proper schema must be sent';

    //Check if the user has permissions to delete a user
    const currentUser = await getUserByFilter(null, token);
    if (!currentUser)
        return 'Error, Invalid user token, please try to login again';

    //If one of these conditions is met the user can be deleted
    if (currentUser.isAdmin || currentUser._id.equals(deleteUserId))
        return null;

    return "You don't have permission to remove the user";
};

const ValidateAdminToken = async (token) => {
    //Check if the user has permissions to delete a user
    const currentUser = await getUserByFilter(null, token);
    if (!currentUser)
        return 'Error, Invalid user token, please try to login again';
    if (!currentUser.isAdmin) return "You don't have permissions";

    //no errors
    return null;
};

const ValidateCreateRoom = async (roomName, token) => {
    //validation
    const errors = await ValidateAdminToken(token);
    if (errors) return ErrorResult(res, errors);
    if (!roomName) return 'Enter Room Name';

    //check if room case-insensitive  already exists
    const query = {
        name: { $regex: roomName, $options: 'i' },
    };
    const isRoomExists = await Room.findOne(query).exec();
    if (isRoomExists) return `Room : ${roomName}, Already Exists`;

    //no errors
    return null;
};

module.exports = {
    ValidateUser,
    ValidateLogin,
    ValidateDeleteUser,
    ValidateAdminToken,
    ValidateCreateRoom,
};
