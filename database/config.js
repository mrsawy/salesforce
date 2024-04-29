const mongoose = require("mongoose");
const { DB_URI } = process.env; // Replace with your actual database URI
//
// connect
const db = mongoose.connect(DB_URI);

// mongoose.connection.on("error", (err) => {
//   console.error("Mongoose connection error:", err);
// });
// mongoose.connection.once("error", (err) => {
//   console.error("Mongoose connection error:", err);
// });

module.exports = db;
