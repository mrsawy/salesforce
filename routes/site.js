const express = require(`express`);
const siteController = require(`./../controllers/site`);
const { jooodahResolver } = require('../utils/errorHandler');

const siteRouter = express.Router();

siteRouter.get("/", jooodahResolver(siteController.getSiteData));
siteRouter.post("/", jooodahResolver(siteController.setSiteData));
// siteRouter.get("/", jooodahResolver(siteController.setSiteData));
siteRouter.post("/upload/:fileName", jooodahResolver(siteController.setSiteUploads));
// siteRouter.get("/", jooodahResolver(siteController.setSiteData));
// siteRouter.post("/", jooodahResolver(siteController.setSiteData));
// usersRouter.delete("/", jooodahResolver(siteController.deleteUser));


module.exports = siteRouter;
