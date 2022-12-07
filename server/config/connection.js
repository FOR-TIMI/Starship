const mongoose = require("mongoose");
const DB_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/starship";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
