const mongoose = require("../config/db");
const Schema = mongoose.Schema;

//schema for storing chat details
const chatRoomSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  thread: [
    {
      from: { type: String, required: true },
      sentTime: { type: Date, required: true },
      content: { type: String, required: true },
    },
  ],
});

var ChatRoom = mongoose.model("chatroom", chatRoomSchema);

module.exports = ChatRoom;
