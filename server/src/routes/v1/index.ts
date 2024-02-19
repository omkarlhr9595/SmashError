import express from "express";
// import authRoute from "./auth.route";
import oauthRoute from "./oauth.route";
const router = express.Router();

// router.use("/auth", authRoute);
router.use("/oauth", oauthRoute);

export default router;
