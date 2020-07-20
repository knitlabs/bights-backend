const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;

const User = require("../models/user-model");

// For a given user: User, return a Token and Friends
function tokenForUser(user) {
  var activeUser = { id: user._id, name: user.name, user_email: user.emailId };
  const token = jwt.sign({ activeUser }, jwtSecret, { expiresIn: "7d" });
  if (token) return { activeUser, token };
}

router.post("/signup", (req, res) => {
  const requestBody = req.body;
  if (Object.keys(requestBody).length === 0) {
    res.sendStatus(400); // body illenkil njan vadi tharum
  } else {
    User.findOne(
      { emailId: requestBody.user_email, isInUse: true },
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500); // database moonjasya
        } else if (!result) {
          const user_password = requestBody.password; // hai subashinte password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user_password, salt, (err, hash) => {
              User.create({
                name: requestBody.user_name,
                emailId: requestBody.user_email,
                passwordHash: hash,
                creationDate: Date.now(),
              }).then((result) => {
                tokenAndFriends = tokenForUser(result);
                res.json(tokenAndFriends);
              });
            });
          });
        } else if (result) {
          // subash pinnem signup cheyyan nokkua, bloody fool
          res
            .status(422)
            .json({ message: "exists", user_email: requestBody.user_email });
        }
      }
    );
  }
});

router.post("/login", (req, res) => {
  const requestBody = req.body;
  if (Object.keys(requestBody).length === 0) {
    res.sendStatus(400); // njan pinnem parayunnu, body illenkil njan vadi tharum
  } else {
    User.findOne(
      { emailId: requestBody.user_email, isInUse: true },
      (err, result) => {
        if (err) {
          // If error, send 500 to the client instead of invalid data
          console.log(err);
          res.send(500); // database moonjasya
        } else if (!result) {
          // if !result, ie the query matched nothing - so 422 - Data
          // Unprocessable Entity (ie, wrong email/password)
          res.status(422).json({ message: "invalid credentials" });
        } else {
          // if it returned anything, ie no error and result is not empty, send
          // the token and friends to the client
          const userPassword = requestBody.password;
          const passwordHash = result.passwordHash;
          bcrypt.compare(userPassword, passwordHash, (err, success) => {
            if (!success) {
              res.sendStatus(422).json({ message: "invalid credentials" });
            } else {
              tokenAndFriends = tokenForUser(result);
              res.json(tokenAndFriends);
            }
          });
        }
      }
    );
  }
});

module.exports = router;
