import express from "express";
import { authCheck } from "../../middlewares/auth";
import { questionController } from "../../controllers";
import validate from "../../middlewares/validate";
import { questionValidation } from "../../validations";

const router = express.Router();

router.post(
  "/ask",
  validate(questionValidation.ask),
  authCheck,
  questionController.ask
);

router.get(
  "/:id",
  validate(questionValidation.getQuestionById),
  questionController.getQuestionById
);

router.get("/", questionController.getAllQuestions);

router.post(
  "/vote",
  validate(questionValidation.voteQuestion),
  authCheck,
  questionController.voteQuestion
);

router.post(
  "/:questionId/view",
  validate(questionValidation.addView),
  questionController.addView
);

router.post(
  "/:questionId/answer",
  validate(questionValidation.addAnswer),
  authCheck,
  questionController.addAnswer
);

router.get(
  "/:questionId/answers",
  validate(questionValidation.getAnswersByQuestionId),
  questionController.getAnswersByQuestionId
);

router.post(
  "/answer/vote",
  validate(questionValidation.voteAnswer),
  authCheck,
  questionController.voteAnswer
);

export default router;
