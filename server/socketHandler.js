const mongoose = require('mongoose');
require('./models/User');
const User = mongoose.model('user');

module.exports = function (server) {
    const socketIO = require('socket.io')(server, { cors: { origin: '*' } });
    let socketList = [];

    const addOrUpdateNewSocket = (socket, roomId, user) => {
        socket.roomId = roomId;
        socket.user = user;
        socketList[socket.id] = socket;
    };

    const disconnectSocket = (socket) => {
        delete socketList[socket.id];
        //try discconect
        try {
            socket.disconnect();
        } catch {}
    };

    const getUserByToken = async (userToken) => {
        const user = await User.collection.findOne({
            token: userToken,
        });
        if (!user) return null;

        return user;
    };

    const updateStatusMessage = (socket, messageId, statusToUpdate) => {
        setTimeout(() => {
            socket.emit('updateMessageStatus', {
                messageId,
                statusMessage: statusToUpdate,
            });
        }, 1000);
    };

    const sendMessageToEntireRoom = (roomId, senderSocket, messageObject) => {
        let shouldUpdateSenderId = false;

        for (let index in socketList) {
            const socket = socketList[index];
            if (socket.roomId !== roomId) continue;
            if (socket.user._id == senderSocket.user._id) continue;

            shouldUpdateSenderId = true;
            socket.emit('message', messageObject);
        }

        if (shouldUpdateSenderId)
            updateStatusMessage(senderSocket, messageObject.messageId, 2); // update status to be VV BLUE
    };

    const tryToHandShake = async (socket) => {
        //check all parameters arrived
        if (
            !socket.request ||
            !socket.request._query ||
            !socket.request._query.roomId ||
            !socket.request._query.userToken
        ) {
            socket.disconnect();
        }
        const { roomId, userToken } = socket.request._query;

        //get User By Token
        const user = await getUserByToken(userToken);
        if (!user) {
            socket.disconnect();
        }

        console.log('HandShake Success with userID', user._id);

        addOrUpdateNewSocket(socket, roomId, user);
        return true;
    };

    //create instance of IO
    socketIO.on('connection', async (socket) => {
        try {
            //make handShake
            await tryToHandShake(socket);
        } catch (ex) {
            socket.disconnect();
        }

        socket.on('message', ({ messageId, message }) => {
            console.log('message arrived', message, messageId);

            updateStatusMessage(socket, messageId, 1); // update status to be VV
            const messageObject = {
                message,
                messageId,
                statusMessage: 0,
                userId: socket.user._id,
                nickName: socket.user.nickName,
                sentTime: new Date().toDateString(),
            };

            sendMessageToEntireRoom(socket.roomId, socket, messageObject);
        });

        socket.on('disconnect', () => {
            console.log('socket -> disconnected ->', socket.id);
            disconnectSocket(socket);
        });
    });
};
