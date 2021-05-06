const {
  MULTIPLE_CHOICE_QUESTION_TYPE,
  DATE_QUESTION_TYPE,
} = require("./constants.js");
const { findSurvey, createRouteHandler } = require("./utils.js");
const surveys = require("./surveys.js");

const submitAnswers = async ({ params: { surveyId }, body: answers }) => {
  const survey = findSurvey(surveys, surveyId);

  if (!Array.isArray(answers)) {
    throw new TypeError("Request body should be an array.");
  }

  if (answers.length !== survey.length) {
    throw new Error(
      "Request body length should equal number of survey questions."
    );
  }

  survey.forEach(({ type, prompt }, questionIndex) => {
    const answer = answers[questionIndex];

    if (typeof answer !== "string") {
      throw new TypeError(
        `Survey answer should be a string. Type received: ${typeof answer}.`
      );
    }

    if (answer.length === 0 || answer.length >= 300) {
      throw Error(
        "Survey answers should be longer than 0 and shorter than 300 characters."
      );
    }

    if (type === DATE_QUESTION_TYPE && isNaN(Date.parse(answer))) {
      throw Error(
        `Answers to ${DATE_QUESTION_TYPE} questions should be parseable.`
      );
    }

    if (type === MULTIPLE_CHOICE_QUESTION_TYPE && !prompt.includes(answer)) {
      throw Error(
        `Answers to ${MULTIPLE_CHOICE_QUESTION_TYPE} questions should be mentioned in the question prompt.`
      );
    }
  });

  surveys[surveyId] = survey.map((question, questionIndex) => ({
    ...question,
    answers: [
      ...question.answers,
      question.type === DATE_QUESTION_TYPE
        ? new Date(answers[questionIndex]).toISOString()
        : answers[questionIndex],
    ],
  }));

  return surveys[surveyId];
};

module.exports = createRouteHandler(submitAnswers);
