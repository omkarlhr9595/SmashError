import express from "express";
import { valid } from "joi";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";
import { authController } from "../../controllers";

const router = express.Router();

router.post(
  "/registerUser",
  validate(authValidation.registerUser),
  authController.registerUser
);

router.post(
  "/registerMentor",
  validate(authValidation.registerMentor),
  authController.registerMentor
);

router.post("/login", validate(authValidation.login), authController.login);

export default router;
