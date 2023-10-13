import dotenv from "dotenv";
dotenv.config();
// export const PORT = process.env.PORT;
// export const MONGODB_URI = process.env.MONGODB_URI;
// export const SECRET = process.env.SECRET;
// export const PALM_URI = process.env.PALM;

export const PORT = 2200;
export const MONGODB_URI = "mongodb://0.0.0.0:27017/SmashError";
export const SECRET = "BARBIE";
export const PALM_URI =
  "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyCcmCh2JEDc5onR0B0RUo1VgFFEERM1sDw";