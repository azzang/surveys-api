const { findSurvey, createRouteHandler } = require("./utils.js");
const surveys = require("./surveys.js");

const getSurvey = async ({ params: { surveyId } }) => {
  const survey = findSurvey(surveys, surveyId);
  return survey;
};

module.exports = createRouteHandler(getSurvey);
