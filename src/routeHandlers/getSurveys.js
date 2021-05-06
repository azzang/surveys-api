const { createRouteHandler } = require("./utils.js");
const surveys = require("./surveys.js");

const getSurveys = async () => {
  return surveys;
};

module.exports = createRouteHandler(getSurveys);
