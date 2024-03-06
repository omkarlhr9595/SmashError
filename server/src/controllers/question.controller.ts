import httpStatus from "http-status";
import questionsService from "../services/questions.service";
import catchAsync from "../utils/catchAsync";

const ask = catchAsync(async (req, res) => {
  const { sub, title, body, tags } = req.body;
  const question = await questionsService.ask(sub, title, body, tags);
  res.status(httpStatus.CREATED).json({ data: question });
});

const getQuestionById = catchAsync(async (req, res) => {
  const question = await questionsService.getQuestionById(req.params.id);
  res.status(httpStatus.OK).json({ data: question });
});

export default {
  ask,
  getQuestionById,
};
