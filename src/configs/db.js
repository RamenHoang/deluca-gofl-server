const mongoose = require("mongoose");

let ConnectDB = (DB_URL) => {
  console.log("DB_URL", DB_URL);
  return mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((res) => {
      console.log("Connect database success");
    })
    .catch((err) => {
      console.log("Connect failed " + err);
    });
};

module.exports = ConnectDB;
