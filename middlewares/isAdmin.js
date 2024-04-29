const jwt = require("jsonwebtoken");
const Admin = require(`./../models/Admin`);

const SECRET_KEY = process.env.secret_key;

module.exports = async (req, res, next) => {
  // Check if user is an admin based on your authentication logic

  console.log(req.headers);
  const { authorization, id } = req.headers;
  if (!authorization && !id) {
    return res.status(401).json({ message: "Access denied. No token or id provided." });
  }
  // Assuming you have a function to verify the token and get user details
  const user = await verifyTokenAndGetUser(authorization.split(` `)[1], id);
  if (!user) {
    console.log({ message: "Access denied. Not an admin." });
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }
  console.log({ user });

  // User is admin, proceed to the next middleware or route handler
  next();
};

const verifyTokenAndGetUser = async (token, id) => {
  try {
    // Verify the JWT token using your secret key
    // console.log(SECRET_KEY, token);

    if (id) {
      let foundedAdmin = await Admin.findById(id);
      if (foundedAdmin) {
        return foundedAdmin;
      } else {
        throw new Error("User not found");
      }
    }
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log(`decodedF==>` ,decoded);

    let foundedAdmin = await Admin.findById(decoded.id);
    if (foundedAdmin) {
      return foundedAdmin;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    // If token verification fails, or user is not found, return null or throw an error
    return null;
  }
};
