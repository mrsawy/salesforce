const { ObjectId } = require("mongodb");

const formatQuestion = require("../utils/formatQuestion.js");
const formatQuestions = require("../utils/formatQuestions.js");
const Level = require(`./../models/level.js`);
const    excelData  = require(`./../constans/questions`);

module.exports = {
  addQuestion: async (req, res) => {
    const { levelId } = req.body;
    try {
      const existingLevel = await Level.findById(levelId);
      if (!existingLevel) {
        throw new Error(`Wrong ID`);
      }
      if (!existingLevel?.questions) {
        existingLevel.questions = [];
      }
      let question = formatQuestion(req.body);
      existingLevel.questions.push(question);
      existingLevel.save();
      res.status(200).json({ questions: existingLevel?.questions });
    } catch (e) {
      console.log(e);
    }
  },
  setQuestions: async (req, res) => {
    const { levelId } = req.body;
    try {
      const existingLevel = await Level.findById(levelId);
      if (!existingLevel) {
        throw new Error(`Wrong ID`);
      }
      if (!existingLevel?.questions) {
        existingLevel.questions = [];
      }
      // let questions = formatQuestions(questionsArr);
      existingLevel.questions = excelData;
      // JSON.stringify();
      existingLevel.save();
      res.status(200).json({ questions: existingLevel?.questions });
    } catch (e) {
      console.log(e);
    }
  },
  deleteQuestion: async (req, res) => {
    const { levelId, questionId } = req?.body;
    console.log(req.body);
    const existingLevel = await Level.findById(levelId);
    if (!existingLevel) {
      throw new Error(`Wrong ID`);
    }
    if (!existingLevel?.questions) {
      existingLevel.questions = [];
    }
    existingLevel.questions = existingLevel?.questions.filter((q) => q._id != questionId);
    existingLevel.save();
    const level = await Level.find();
    res.status(200).json({ questions: existingLevel?.questions, level });
  },
  getAllQuestions: async (req, res) => {
    let { levelId } = req.params;
    const existingLevel = await Level.findById(levelId);
    if (!existingLevel) {
      throw new Error(`Wrong ID`);
    }
    res.status(200).json(existingLevel?.questions ? existingLevel?.questions : []);
  },
  getOneQuestion: async (req, res) => {},
  editOneQuestion: async (req, res) => {
    const {
      levelId,
      questionId,
      value_ar,
      value_en,
      wrong_ans_1_en,
      wrong_ans_2_en,
      wrong_ans_3_en,
      wrong_ans_4_en,
      wrong_ans_1_ar,
      wrong_ans_2_ar,
      wrong_ans_3_ar,
      wrong_ans_4_ar,
      correct_ans_ar,
      correct_ans_en,
    } = req.body;

    const newQuestion = {
      value: { en: value_en, ar: value_ar },
      correct_answer: { ar: correct_ans_ar, en: correct_ans_en },
      wrong_answers: [
        { ar: wrong_ans_1_ar, en: wrong_ans_1_en },
        { ar: wrong_ans_2_ar, en: wrong_ans_2_en },
        { ar: wrong_ans_3_ar, en: wrong_ans_3_en },
        { ar: wrong_ans_4_ar, en: wrong_ans_4_en },
      ].filter((e) => e.ar && e.en),
    };

    console.log(req.body);
    console.log(`newQuestion  ==>`, newQuestion);

    const existingLevel = await Level.findById(levelId);
    if (!existingLevel) {
      throw new Error(`Wrong ID`);
    }

    if (!existingLevel.questions) {
      existingLevel.questions = [];
    }
    //
    // const objId = ObjectId.createFromTime(questionId);
    console.log(`questionId ==>`, questionId);
    // console.log(`objId ==>`, objId);
    // console.log(`objId.tostring ==>`, objId.toString());
    existingLevel.questions = existingLevel.questions.map((q) => {
      console.log(q._id.toString(), `${questionId}`, q._id.toString() == `${questionId}`);

      if (q._id.toString() == `${questionId}`) {
        console.log(`same QUESTION`);
        return newQuestion;
      }
      return q;
    });
    //
    await existingLevel.save();

    const level = await Level.find();
    res.status(200).json({ questions: existingLevel.questions, level });
  },
};
