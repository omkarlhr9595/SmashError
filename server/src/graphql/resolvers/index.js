import { userResolver } from "./user.js";
import { questionResolver } from "./question.js";
export const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...questionResolver.Mutation,
  },
};
