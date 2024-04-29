const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  _id: {
    type: String, // Use String as the type for _id
    required: true,
  },

  name_en: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  level_en: {
    type: String,
    required: true,
  },
  level_ar: {
    type: String,
    required: true,
  },
  numberOfMinutes: {
    type: Number,
    required: true,
  },
  questions: {
    required: true,
    defaultValue: [],
    type: [
      {
        value: {
          ar: {
            type: String,
            required: true,
          },
          en: {
            type: String,
            required: true,
          },
        },
        correct_answer: {
          ar: { type: String, required: true },
          en: { type: String, required: true },
        },
        wrong_answers: [
          {
            ar: { type: String, required: true },
            en: { type: String, required: true },
          },
        ],
      },
    ],
  },
  pauseTime: {
    value: { type: Number, required: true, defaultValue: 300 },
    numberOfPauses: { type: Number, required: true, defaultValue: 2 },
  },
});

const Level = mongoose.model("level", LevelSchema, `level`);

module.exports = Level;
