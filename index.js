require("dotenv").config();
const express = require("express");

// const database = require("./config/db");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth-routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user-routes");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
