const { ObjectId } = require("mongodb");
const { mongoose } = require("mongoose");
const Level = require("../models/level");

module.exports = {
  createLevel: async (req, res) => {
    try {
      let { levels } = req?.body;
      // console.log(levels);
      const allLevels = [];

      for (const level of levels) {
        const {
          level_en,
          level_ar,
          name_ar,
          name_en,
          numberOfMinutes,
          questions,
          identifier,
          _id,
          pauseTime,
        } = level;
        const newData = {
          name_ar,
          name_en,
          numberOfMinutes: +numberOfMinutes,
          // questions,
          level_en,
          level_ar,
          pauseTime: { value: +pauseTime?.value, numberOfPauses: +pauseTime?.numberOfPauses },
        };
        // ****************************************************************
        let existingLevel = await Level.findById(_id);

        if (existingLevel) {
          // Update existing level
          const updatedLevel = await Level.findByIdAndUpdate(_id, newData, { new: true });
          allLevels.push(updatedLevel);
        } else {
          const createdLevel = await Level.create({
            ...newData,
            questions: [],
            _id: new ObjectId(_id),
          });
          allLevels.push(createdLevel);
        }
      }
      await Level.deleteMany({});
      await Level.insertMany(allLevels);

      res.status(201).json(allLevels);
    } catch (error) {
      console.error(error);
      console.error("Error creating/updating levels:", error?.message);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteLevel: async (req, res) => {
    const { levelId } = req.params;
    const deletedLevel = await Level.findByIdAndDelete(levelId);
    if (!deletedLevel) {
      return res.status(404).json({ message: "Level not found" });
    }
    res.json(deletedLevel);
  },

  getAllLevels: async (req, res) => {
    const levels = await Level.find();
    res.json(levels);
  },

  getOneLevel: async (req, res) => {
    const { levelId } = req.params;
    const level = await Level.findById(levelId);

    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    res.json(level);
  },
};
