const express = require("express");
const {
  API_ENDPOINTS,
  SURVEYS_PATH,
  SURVEY_PATH,
  QUESTION_PATH,
  QUESTION_ORDER_PATH,
  SUBMISSIONS_PATH,
  HEALTH_CHECK_PATH,
} = require("./constants.js");

const {
  createSurvey,
  getSurveys,
  getSurvey,
  addQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  submitAnswers,
  deleteSurvey,
} = require("./routeHandlers");

const app = express();

app.use(express.json());

app.get(API_ENDPOINTS, (_, res) => {
  res.json([
    ...new Set(
      app._router.stack
        .filter((layer) => layer.route && layer.route.path)
        .map((layer) => layer.route.path)
    ),
  ]);
});

app.post(SURVEYS_PATH, createSurvey);
app.get(SURVEYS_PATH, getSurveys);

app.post(SURVEY_PATH, addQuestion);
app.get(SURVEY_PATH, getSurvey);
app.delete(SURVEY_PATH, deleteSurvey);

app.get(QUESTION_PATH, getQuestion);
app.put(QUESTION_PATH, updateQuestion);
app.delete(QUESTION_PATH, deleteQuestion);

app.post(QUESTION_ORDER_PATH, reorderQuestions);
app.post(SUBMISSIONS_PATH, submitAnswers);

app.get(HEALTH_CHECK_PATH, (_, res) => {
  res.send({ hello: "world" });
});

app.use((_, res) => {
  res.status(404);
  res.json({
    message: "Could not find resource.",
    statusCode: res.statusCode,
  });
});

app.use((err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500);
  res.json({
    message: err.message,
    stackTrace: err.stack,
    statusCode: res.statusCode,
  });
});

app.listen(3001, () => {
  console.log("surveys-api running on port 3001");
});
