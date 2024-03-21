import Joi from "joi";
const ask = {
  body: Joi.object().keys({
    sub: Joi.string().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  }),
};
const getQuestionById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const voteQuestion = {
  body: Joi.object().keys({
    questionId: Joi.string().required(),
    userSub: Joi.string().required(),
    vote: Joi.string().valid("upvote", "downvote").required(),
  }),
};
const addView = {
  params: Joi.object().keys({
    questionId: Joi.string().required(),
  }),
};

const addAnswer = {
  params: Joi.object().keys({
    questionId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    sub: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

export default {
  ask,
  getQuestionById,
  voteQuestion,
  addView,
  addAnswer,
};
