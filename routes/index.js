const express = require(`express`);
const questions = require("../controllers/questions");
const levelsRouter = require("./levels");
const userRouter = require("./users");
const authRouter = require("./auth");
const questionsRouter = require("./questions");
const siteRouter = require("./site");

const mainApiRoute = express.Router();

mainApiRoute.use("/questions", questionsRouter);
mainApiRoute.use("/level", levelsRouter);
mainApiRoute.use("/users", userRouter);
mainApiRoute.use("/auth", authRouter);
mainApiRoute.use("/site", siteRouter);
mainApiRoute.use("/", levelsRouter);

module.exports = mainApiRoute;
