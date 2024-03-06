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
export default {
  ask,
  getQuestionById,
};
