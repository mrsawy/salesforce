const express = require(`express`);
const usersController = require(`./../controllers/users`);
const { jooodahResolver } = require("../utils/errorHandler");
const isAdmin = require("../middlewares/isAdmin");

const usersRouter = express.Router();

usersRouter.get("/", isAdmin, jooodahResolver(usersController.getAllUsers));
usersRouter.post("/", jooodahResolver(usersController.createUser));
usersRouter.post("/check", jooodahResolver(usersController.check));
usersRouter.delete("/", jooodahResolver(usersController.deleteUser));
usersRouter.get("/:userId", jooodahResolver(usersController.getOneUser));

module.exports = usersRouter;
