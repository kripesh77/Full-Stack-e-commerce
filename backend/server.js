const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const app = require("./app");

//this handles any uncaught exception that occurs in the app
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! 💥 Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("Database connected successfully"));

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//this handles any unhandled rejection such as if promise is rejected and we have not handled it, then that situation is called unhandled rejection, as the promise rejection is not handled properly.
//Some of the scenarios might be the wrong database credentials
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! 💥 Shutting down");
  //server.close first finishes all its request responses and then only call process.exit(1) {process.exit(1) crashes the server}
  server.close(() => {
    process.exit(1);
  });
});
