const mongoose = require('mongoose');
require('../models/Room');
const Room = mongoose.model('room');
const validateModel = require('../validateModel');
const { ErrorResult, Result } = require('../Utils/helpers');

const getRooms = async (req, res) => {
    let { query } = req.body;
    if (query === undefined) query = {};


    //try to remove the user
    Room.find(query, function (err, rooms) {
        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }

        return Result(res, 'rooms', rooms);
    });
};

const addRoom = async (req, res) => {
    const { roomName, token } = req.body;

    //validation
    const errors = await validateModel.ValidateCreateRoom(roomName, token);
    if (errors) return ErrorResult(res, errors);

    //Create Room Object
    const newRoom = {
        name: roomName,
        chats: [],
    };

    Room.collection.insertOne(new Room(newRoom), (err) => {
        if (err != null) {
            console.error('Cannot Create Room', newRoom);
            return ErrorResult(
                res,
                'Error whilt trying to create the room,' + err
            );
        }

        return Result(res, 'room', newRoom);
    });
};

module.exports = { getRooms, addRoom };
