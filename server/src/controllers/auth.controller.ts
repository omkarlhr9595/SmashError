import httpStatus from "http-status";
import { userService,authService, tokenService } from "../services";
import catchAsync from "../utils/catchAsync";

const registerUser = catchAsync(async (req, res) => {
  const { email, password, name, className,rollNo } = req.body;
  const user = await userService.createUser(
    email,
    password,
    name,
    rollNo,
    className,
  );
  res.status(httpStatus.CREATED).send(user);
});

const registerMentor = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userService.createMentor(email, password, name);
  res.status(httpStatus.CREATED).send(user);
});


const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const id = user.id;
  const token = await tokenService.generateAuthTokens(id);
  res.send({ user, token });
});


export default {
    registerUser,
    registerMentor,
    login,
};
