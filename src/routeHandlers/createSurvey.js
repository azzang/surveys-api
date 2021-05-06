const surveys = require("./surveys.js");
const {
  generateId,
  validateSurveyQuestion,
  pluckQuestion,
  createRouteHandler,
} = require("./utils.js");

const createSurvey = async ({ body: survey }) => {
  if (!Array.isArray(survey)) {
    throw new TypeError("Request body should be an array.");
  }

  if (survey.length === 0) {
    throw new Error("Request body should contain at least one question.");
  }

  survey.forEach((question) => {
    validateSurveyQuestion(question);
  });

  const surveyId = await generateId();

  if (surveyId in surveys) {
    throw new Error("Failed to generate unique id.");
  }

  const questionIds = await Promise.all(survey.map(() => generateId()));

  if (new Set(questionIds).size < questionIds.length) {
    throw new Error("Failed to generate unique question ids.");
  }

  surveys[surveyId] = questionIds.map((questionId, questionIndex) => ({
    id: questionId,
    ...pluckQuestion(survey[questionIndex]),
    answers: [],
  }));

  return {
    id: surveyId,
    questions: surveys[surveyId],
  };
};

module.exports = createRouteHandler(createSurvey);
