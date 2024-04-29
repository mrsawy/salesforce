const Admin = require(`./../models/Admin`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.secret_key;

module.exports = {
  login: async (req, res) => {
    let { email, password } = req.body;
    // console.log(email , password)
    const admin = await Admin.findOne({ email });
    // console.log(admin)

    if (!admin) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    const token = jwt.sign({ id: admin._id, email }, SECRET_KEY);
    res.json({ token, id: admin._id });
    console.log(`Login Done ##`);
  },
  signUp: async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashedPassword });
    //
    let createdAdmin = await Admin.findOne({ email, password: hashedPassword });

    // await admin.save();
    console.log(createdAdmin);
    //
    const token = jwt.sign({ id: admin._id, email }, SECRET_KEY);
    res.status(201).json({ token, id: admin._id });
  },
  checkAuth: async (req, res) => {
    const { token, id } = req.body;

    if (!token && !id) {
      return res.status(403).json({ error: "Access forbidden. Token missing." });
    }
    const admin = await Admin.findById(id);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      // console.log(admin , decoded , err)
      if (err && !admin) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      } else if ((!err && admin) || (!err && !admin)) {
        return res.status(200).json({ token, email: decoded.email, id: decoded.id });
      } else if (err && admin) {
        res.status(200).json({ email: admin.email, id: admin.id });
      }
    });
  },
};
