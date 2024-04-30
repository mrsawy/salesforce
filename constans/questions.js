const xlsx = require("xlsx");
const path = require("path");

// /
let result = [];
// __________________________________________________________________
try {
  const fileExcel = xlsx.readFile(path.join(__dirname, "./developer.xlsx"));
  // const workbookEn = xlsx.readFile("./constans/EN_data_with_answers.xlsx");

  // Access Worksheet
  const worksheet = fileExcel.Sheets[fileExcel.SheetNames[0]];
  //
  const data = xlsx.utils.sheet_to_json(worksheet);
  //
  let shortest_wrong_ans = { length: 10, value: null };
  let longest_wrong_ans = { length: 0, value: null };

  data.forEach((d, i) => {
    const options = d.Options.split(",").map((e) => ({ ar: e.trim(), en: e.trim() }));
    const seenOptions = new Set();

    const wrongAnswers = options.filter((e) => {
      const isDuplicate = seenOptions.has(e.ar) || seenOptions.has(e.en);
      seenOptions.add(e.ar);
      seenOptions.add(e.en);
      return !isDuplicate && e.en !== d["Correct Answer"] && e.ar !== d["Correct Answer"];
    });

    result[i] = {
      value: { ar: d.Question, en: d.Question },
      correct_answer: { ar: d["Correct Answer"], en: d["Correct Answer"] },
      wrong_answers: wrongAnswers,
    };

    if (options.length > longest_wrong_ans.length) {
      longest_wrong_ans.length = options.length;
      longest_wrong_ans.value = result[i];
    }

    if (options.length < shortest_wrong_ans.length) {
      shortest_wrong_ans.length = options.length;
      shortest_wrong_ans.value = result[i];
    }
  });
  console.log({
    result_242: result.map((r) => r.wrong_answers.map((e) => e.en))[242],
    result_243: result.map((r) => r.wrong_answers.map((e) => e.en))[243],
    result: result.map((ele) => ({
      val: ele.value?.en,
      corr: ele.correct_answer?.en,
      wrong: ele.wrong_answers.length,
    })),
  });
  module.exports = result;
} catch (e) {
  console.log(e);
  module.exports = [];
}
