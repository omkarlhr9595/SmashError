import { User, Mentor } from "@prisma/client";
import moment, { Moment } from "moment";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { AuthTokensResponse } from "../types/response";
const generateToken = (
  userId: number,
  expires: Moment,
  type: "ACCESS",
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (id: number): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(id, accessTokenExpires, "ACCESS");
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

export default {
  generateAuthTokens,
};
