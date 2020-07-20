const mongoose = require("mongoose");

dbURI = process.env.DB_URI;
if (typeof dbURI !== "undefined") {
  mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log(err);
      else console.log("Database connected");
    }
  );
} else {
  console.log(Error("Database connection URL not set."));
}

module.exports = mongoose;
