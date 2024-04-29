const xlsx = require("xlsx");
const path = require("path");

// /
let result = [];
// __________________________________________________________________
try {
  const fileExcel = xlsx.readFile(
    path.join(__dirname, "./all_developer_salesforce_questions.xlsx")
  );
  // const workbookEn = xlsx.readFile("./constans/EN_data_with_answers.xlsx");

  // Access Worksheet
  const worksheet = fileExcel.Sheets[fileExcel.SheetNames[0]];
  //
  const data = xlsx.utils.sheet_to_json(worksheet);
  //
  let shortest_wrong_ans = { length: 10, value: null };
  let longest_wrong_ans = { length: 0, value: null };

  data.forEach((d, i) => {
    result[i] = {
      value: { ar: d.Question, en: d.Question },
      correct_answer: {
        ar: d["Correct Answer"],
        en: d["Correct Answer"],
      },
      wrong_answers: d.Options.split(`,`)
        .map((e) => ({ ar: e.trim(), en: e.trim() }))
        .filter((e) => e?.en !== d["Correct Answer"] && e?.ar !== d["Correct Answer"]),
    };
    if (d.Options.split(`,`).length > longest_wrong_ans?.length) {
      longest_wrong_ans.length = d.Options.split(`,`).length;
      longest_wrong_ans.value = result[i];
    }
    if (d.Options.split(`,`).length < shortest_wrong_ans?.length) {
      shortest_wrong_ans.length = d.Options.split(`,`).length;
      shortest_wrong_ans.value = result[i];
    }
  });

  // console.log({
  //   result,
  // });
  module.exports = result;
} catch (e) {
  console.log(e);
  module.exports = [];
}
