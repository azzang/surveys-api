const { findQuestionIndex, createRouteHandler } = require("./utils.js");

const surveys = require("./surveys.js");

const deleteQuestion = async ({ params: { surveyId, questionId } }) => {
  const questionIndex = findQuestionIndex(surveys, surveyId, questionId);
  const question = surveys[surveyId][questionIndex];

  surveys[surveyId] = surveys[surveyId].filter(({ id }) => id !== questionId);

  return question;
};

module.exports = createRouteHandler(deleteQuestion);
