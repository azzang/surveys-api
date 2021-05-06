const {
  pluckQuestion,
  validateSurveyQuestion,
  createRouteHandler,
  findSurvey,
  generateId,
} = require("./utils.js");
const surveys = require("./surveys.js");

const addQuestion = async ({ params: { surveyId }, body: question }) => {
  validateSurveyQuestion(question);

  const survey = findSurvey(surveys, surveyId);
  const questionId = await generateId();

  if (survey.some(({ id }) => id === questionId)) {
    throw new Error("Failed to generate unique question id.");
  }

  survey.push({
    id: questionId,
    ...pluckQuestion(question),
    answers: [],
  });

  return survey[survey.length - 1];
};

module.exports = createRouteHandler(addQuestion);
