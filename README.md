# Surveys API

An in-memory data store of surveys, with a REST API. Surveys are ordered lists of questions (see schema below).

## Getting Started

After cloning this repo:

```bash
  npm install
  npm run dev
```

## Question Schema

- type (**required**): "date" | "text entry" | "multiple choice"
- prompt (**required**): question text (e.g. "Why?")

## API Endpoints

- `GET /api/v1/endpoints` : get list of api endpoints
- `POST /api/v1/surveys` : create a survey; expects a list of questions
- `GET /api/v1/surveys` : get all surveys
- `POST /api/v1/surveys/:surveyId` : add question to a survey; expects a question
- `GET /api/v1/surveys/:surveyId` : get a survey
- `DELETE /api/v1/surveys/:surveyId` : delete a survey
- `GET /api/v1/surveys/:surveyId/questions/:questionId` : get a question
- `PUT /api/v1/surveys/:surveyId/questions/:questionId` : update a question; expects a question
- `DELETE /api/v1/surveys/:surveyId/questions/:questionId` : delete a question
- `POST /api/v1/surveys/:surveyId/question-orders` : reorder questions; expects a list of question ids in the order you want questions
- `POST /api/v1/surveys/:surveyId/submissions` : submit answers to survey; expects a list of strings (survey question answers); answers to multiple choice questions should be an option mentioned in question prompt; answers to date questions should be parsable by Date.parse()

## Getting To Production

- code review & QA (if possible)
- automated tests (unit, load...)
- any necessary build or transpilation steps
- host (e.g. AWS) configuration (set environment variables...)
- deploy (e.g. SFTP)

### 🙏
