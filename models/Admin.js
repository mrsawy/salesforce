const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'admin' // Specify the desired collection name

  }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
