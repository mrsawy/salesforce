module.exports = ({
  correct_ans_ar,
  correct_ans_en,
  value_ar,
  value_en,
  wrong_ans_1_ar,
  wrong_ans_1_en,
  wrong_ans_2_ar,
  wrong_ans_2_en,
  wrong_ans_3_ar,
  wrong_ans_3_en,
  levelId,
}) => {
  const isEmpty = Object.values(arguments).some((v) => !v);
  if (isEmpty) {
    throw new Error(`Must Fill All Fields`);
  }

  return {
    value: { ar: value_ar, en: value_en },
    correct_answer: { ar: correct_ans_ar, en: correct_ans_en },
    wrong_answers: [
      { ar: wrong_ans_1_ar, en: wrong_ans_1_en },
      { ar: wrong_ans_2_ar, en: wrong_ans_2_en },
      { ar: wrong_ans_3_ar, en: wrong_ans_3_en },
    ],
  };
};
