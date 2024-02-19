import httpStatus from "http-status";
import { oauthService } from "../services";
import catchAsync from "../utils/catchAsync";

const getUserDetails = catchAsync(async (req, res) => {
  const { sub, name, nickname, email, picture } = req.body;
  const user = await oauthService.getUserDetails(
    sub,
    name,
    nickname,
    email,
    picture
  );

  res.status(httpStatus.CREATED).send(user);
});

export default {
  getUserDetails,
};
