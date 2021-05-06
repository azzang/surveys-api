const crypto = require("crypto");
const {
  TYPE_QUESTION_KEY,
  PROMPT_QUESTION_KEY,
  TEXT_ENTRY_QUESTION_TYPE,
  MULTIPLE_CHOICE_QUESTION_TYPE,
  DATE_QUESTION_TYPE,
} = require("./constants.js");

const pluck = (keys, obj) =>
  keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});

const pluckQuestion = (question) =>
  pluck([TYPE_QUESTION_KEY, PROMPT_QUESTION_KEY], question);

const validateSurveyQuestion = (surveyQuestion) => {
  if (typeof surveyQuestion !== "object") {
    throw new TypeError(
      `Survey question should be an object. Received type ${typeof surveyQuestion}.`
    );
  }

  const keys = Object.keys(surveyQuestion);

  if (!keys.includes(TYPE_QUESTION_KEY)) {
    throw new Error(
      `Survey question should contain a '${TYPE_QUESTION_KEY}' key.`
    );
  }

  if (!keys.includes(PROMPT_QUESTION_KEY)) {
    throw new Error(
      `Survey question should contain a '${PROMPT_QUESTION_KEY}' key.`
    );
  }

  const { type, prompt } = surveyQuestion;

  if (
    ![
      TEXT_ENTRY_QUESTION_TYPE,
      MULTIPLE_CHOICE_QUESTION_TYPE,
      DATE_QUESTION_TYPE,
    ].includes(type)
  ) {
    throw new TypeError(
      `Survey question type should be one of the following: '${TEXT_ENTRY_QUESTION_TYPE}', '${MULTIPLE_CHOICE_QUESTION_TYPE}', '${DATE_QUESTION_TYPE}'`
    );
  }

  if (typeof prompt !== "string") {
    throw new TypeError(
      `Survey question prompt should be a string. Type received: ${typeof prompt}.`
    );
  }

  if (prompt.length === 0 || prompt.length >= 300) {
    throw Error(
      `Survey question prompt should be longer than 0 and shorter than 300 characters.`
    );
  }
};

const generateId = async () => {
  const buffer = await crypto.randomBytes(12);
  return buffer.toString("hex");
};

const findSurvey = (surveys, surveyId) => {
  if (!surveys[surveyId]) {
    const err = new Error(`Survey ${surveyId} could not be found.`);
    err.statusCode = 404;
    throw err;
  }

  return surveys[surveyId];
};

const findQuestionIndex = (surveys, surveyId, questionId) => {
  const survey = findSurvey(surveys, surveyId);
  const questionIndex = survey.findIndex(({ id }) => id === questionId);

  if (questionIndex === -1) {
    const err = new Error(`Question ${questionId} could not be found.`);
    err.statusCode = 404;
    throw err;
  }

  return questionIndex;
};

const createRouteHandler = (requestHandler) => async (req, res, next) => {
  try {
    const data = await requestHandler(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  pluck,
  validateSurveyQuestion,
  generateId,
  pluckQuestion,
  findQuestionIndex,
  findSurvey,
  createRouteHandler,
};
