const { findQuestionIndex, createRouteHandler } = require("./utils.js");

const surveys = require("./surveys.js");

const getQuestion = async ({ params: { surveyId, questionId } }) => {
  const questionIndex = findQuestionIndex(surveys, surveyId, questionId);
  return surveys[surveyId][questionIndex];
};

module.exports = createRouteHandler(getQuestion);
