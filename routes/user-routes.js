const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
const ChatRoom = require("../models/chat-model");

const jwtSecret = process.env.JWT_SECRET;

// authCheck will look at the JWT and identify the user currently logged in.
// and will set req.activeUser accordingly.
function authCheck(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    // 403 Forbidden if no authorization header
    res.sendStatus(403);
  } else {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, jwtSecret, (err, authData) => {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        User.findById(
          authData.activeUser.id,
          "_id name emailId",
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(500);
            } else {
              req.activeUser = result;
              next();
            }
          }
        );
      }
    });
  }
}

router.get("/", authCheck, (req, res) => {
  const activeUser = req.activeUser;
  User.find({ isInUse: true }, "_id name emailId", (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

router.get("/profile", authCheck, (req, res) => {
  const activeUser = req.activeUser;
  res.json(activeUser);
});

router.get("/chats", authCheck, (req, res) => {
  const activeUser = req.activeUser;
  ChatRoom.find(
    { $or: [{ source: activeUser._id }, { sink: activeUser._id }] },
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/chats/new", authCheck, (req, res) => {
  const activeUser = req.activeUser;
  const requestBody = req.body;
  if (
    Object.keys(requestBody).length === 0 ||
    typeof requestBody.chat_sink === "undefined"
  ) {
    res.sendStatus(400); // body illenkil njan vadi tharum
  } else {
    const chatSource = activeUser._id; // who initiated the chat?
    const chatSink = requestBody.chat_sink; // to whom?

    ChatRoom.create(
      {
        source: chatSource,
        sink: chatSink,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.json(result);
        }
      }
    );
  }
});

router.post("/chats/:chatId/send", authCheck, (req, res) => {
  const activeUser = req.activeUser;
  const chatId = req.params.chatId;
  const requestBody = req.body;
  if (
    Object.keys(requestBody).length === 0 ||
    typeof requestBody.message_text === "undefined"
  ) {
    res.sendStatus(400); // body illenkil njan vadi tharum
  } else {
    ChatRoom.findByIdAndUpdate(
      chatId,
      {
        $push: {
          thread: {
            from: activeUser._id,
            sentTime: Date.now(),
            content: requestBody.message_text,
          },
        },
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.json(result);
        }
      }
    );
  }
});

module.exports = router;
