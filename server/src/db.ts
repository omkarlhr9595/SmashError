import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";

export const connectToDB = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
