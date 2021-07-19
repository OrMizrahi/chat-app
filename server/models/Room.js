const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const roomSchema = new Schema({
    name: String,
    dateCreated: { type: Date, default: Date.now() },
    chats: [
        {
            messageId: { type: String, default: () => uuid.v4() },
            userId: { type: Schema.Types.ObjectId },
            nickName: { type: String },
            statusMessage: { type: Number, default: 0 },
            message: { type: String },
            sentTime: { type: Date, default: Date.now() },
        },
    ],
});

mongoose.model('room', roomSchema);
