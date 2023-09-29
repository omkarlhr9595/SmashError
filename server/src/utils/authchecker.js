import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

export const authChecker = (context) => {
  const token = context.req.headers.authorization;
  if (!token) {
    throw new AuthenticationError("No auth token found. Authorization denied.");
  }
  try {
    const decodedUser = jwt.verify(token, SECRET);
    return decodedUser;
  } catch (err) {
    throw new AuthenticationError(err);
  }
};
