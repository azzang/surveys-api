const { findSurvey, createRouteHandler } = require("./utils.js");
const surveys = require("./surveys.js");

const deleteSurvey = async ({ params: { surveyId } }) => {
  const survey = findSurvey(surveys, surveyId);
  delete surveys[surveyId];
  return survey;
};

module.exports = createRouteHandler(deleteSurvey);
