const API_PATH = "/api/v1";
const API_ENDPOINTS = `${API_PATH}/endpoints`;
const SURVEYS_PATH = `${API_PATH}/surveys`;
const SURVEY_PATH = `${SURVEYS_PATH}/:surveyId`;
const QUESTION_PATH = `${SURVEY_PATH}/questions/:questionId`;
const QUESTION_ORDER_PATH = `${SURVEY_PATH}/question-orders`;
const SUBMISSIONS_PATH = `${SURVEY_PATH}/submissions`;
const SUBMISSION_PATH = `${SUBMISSIONS_PATH}/:submissionId`;
const HEALTH_CHECK_PATH = "/health-check";

module.exports = {
  API_PATH,
  API_ENDPOINTS,
  SURVEYS_PATH,
  SURVEY_PATH,
  QUESTION_PATH,
  QUESTION_ORDER_PATH,
  SUBMISSIONS_PATH,
  SUBMISSION_PATH,
  HEALTH_CHECK_PATH,
};
