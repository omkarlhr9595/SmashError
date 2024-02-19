import express from "express";
import { authCheck } from "../../middlewares/auth";
import { oauthController } from "../../controllers";

const router = express.Router();

router.post("/getUserdetails", authCheck, oauthController.getUserDetails);

export default router;
