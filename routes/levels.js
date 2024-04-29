const express = require('express');
const levelsController = require('../controllers/levels');
const { jooodahResolver } = require('../utils/errorHandler');

const levelsRouter = express.Router();

// Get all levels
levelsRouter.get('/', jooodahResolver(levelsController.getAllLevels));
// Create a new level
levelsRouter.post('/', jooodahResolver(levelsController.createLevel));

// Delete a level by ID
levelsRouter.delete('/:levelId', levelsController.deleteLevel);


// Get a single level by ID
levelsRouter.get('/:levelId', levelsController.getOneLevel);

module.exports = levelsRouter;
