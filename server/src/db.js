import mongoose from "mongoose";
import { MONGODB_URI as url } from "./utils/config.js";

export const connectToDB = async () => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected Succesfuly");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
