const {
  pluckQuestion,
  validateSurveyQuestion,
  findQuestionIndex,
  createRouteHandler,
} = require("./utils.js");
const surveys = require("./surveys.js");

const updateQuestion = async ({
  params: { surveyId, questionId },
  body: update,
}) => {
  validateSurveyQuestion(update);

  const questionIndex = findQuestionIndex(surveys, surveyId, questionId);

  surveys[surveyId][questionIndex] = {
    ...pluckQuestion(update),
    id: questionId,
    answers: [],
  };

  return surveys[surveyId][questionIndex];
};

module.exports = createRouteHandler(updateQuestion);
