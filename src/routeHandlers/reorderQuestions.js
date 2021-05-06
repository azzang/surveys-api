const { findSurvey, createRouteHandler } = require("./utils.js");
const surveys = require("./surveys.js");

const reorderQuestions = async ({ params: { surveyId }, body: ids }) => {
  const survey = findSurvey(surveys, surveyId);

  if (!Array.isArray(ids)) {
    throw new TypeError("Request body should be an array.");
  }

  if (ids.length !== survey.length) {
    throw new Error(
      "Request body length should equal number of survey questions."
    );
  }

  if (!survey.every(({ id }) => ids.includes(id))) {
    throw new Error("Request body should contain every question id.");
  }

  const questionsById = survey.reduce((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});

  surveys[surveyId] = ids.map((id) => questionsById[id]);

  return surveys[surveyId];
};

module.exports = createRouteHandler(reorderQuestions);
