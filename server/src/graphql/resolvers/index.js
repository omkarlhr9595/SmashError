import { userResolver } from "./user.js";
import { questionResolver } from "./question.js";
import { answerResolver } from "./answer.js";
export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...questionResolver.Query,
    ...answerResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...questionResolver.Mutation,
    ...answerResolver.Mutation,
  },
};
