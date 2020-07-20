const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const jwtSecret = process.env.JWT_SECRET;

function authCheck(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    // 403 Forbidden if no authorization header
    res.sendStatus(403);
  } else {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  }
}

router.get("/profile", authCheck, (req, res) => {
  const authToken = req.token;
  jwt.verify(authToken, jwtSecret, (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      const user_email = authData.activeUser.user_email;
      User.findOne({ emailId: user_email, isInUse: true }, (err, result) => {
        if (err) res.send(500);
        else {
          const payload = {
            user_email: result.emailId,
            user_name: result.name,
            created_on: result.CreationDate,
          };
          res.json(payload);
        }
      });
    }
  });
});

module.exports = router;
