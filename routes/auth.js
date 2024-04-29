const express = require(`express`);
const authController = require(`./../controllers/auth`);
const { jooodahResolver } = require('../utils/errorHandler');

const authRouter = express.Router();

authRouter.post("/login", jooodahResolver(authController.login));
authRouter.post("/signUp", jooodahResolver(authController.signUp));
authRouter.post("/checkAuth", jooodahResolver(authController.checkAuth));

module.exports = authRouter;
