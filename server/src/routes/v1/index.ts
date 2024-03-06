import express from "express";
// import authRoute from "./auth.route";
import oauthRoute from "./oauth.route";
import questionRoute from "./question.route";
const router = express.Router();

// router.use("/auth", authRoute);
router.use("/oauth", oauthRoute);
router.use("/questions", questionRoute);

export default router;
