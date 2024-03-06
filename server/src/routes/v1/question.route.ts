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

export default router;
