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

const getAllQuestions = catchAsync(async (req, res) => {
  const params = req.query;
  if (params.filter === "highest-votes") {
    const questions = await questionsService.getAllQuestionsByHighestVotes();
    return res.status(httpStatus.OK).json({ data: questions });
  }
  if (params.filter === "newest") {
    const questions = await questionsService.getAllQuestionsByNewest();
    return res.status(httpStatus.OK).json({ data: questions });
  }
  if (params.filter === "this-week") {
    const questions = await questionsService.getAllQuestionsThisWeek();
    return res.status(httpStatus.OK).json({ data: questions });
  }
  const questions = await questionsService.getAllQuestions();
  res.status(httpStatus.OK).json({ data: questions });
});

const voteQuestion = catchAsync(async (req, res) => {
  const { questionId, userSub, vote } = req.body;
  await questionsService.voteQuestion(questionId, userSub, vote);
  res.status(httpStatus.NO_CONTENT).send();
});

const addView = catchAsync(async (req, res) => {
  const { questionId } = req.params;
  await questionsService.addView(questionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const addAnswer = catchAsync(async (req, res) => {
  const { questionId } = req.params;
  const { sub, content } = req.body;

  const answer = await questionsService.addAnswer(questionId, sub, content);
  res.status(httpStatus.CREATED).json({ data: answer });
});

const getAnswersByQuestionId = catchAsync(async (req, res) => {
  const { questionId } = req.params;
  const answers = await questionsService.getAnswersByQuestionId(questionId);
  res.status(httpStatus.OK).json({ data: answers });
});

export default {
  ask,
  getQuestionById,
  getAllQuestions,
  voteQuestion,
  addView,
  addAnswer,
  getAnswersByQuestionId,
};
