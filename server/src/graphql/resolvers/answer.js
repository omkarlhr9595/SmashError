import { UserInputError } from "apollo-server";
import { Question } from "../../models/question.js";
import { User } from "../../models/user.js";
import { authChecker } from "../../utils/authchecker.js";
import { errorHandler } from "../../utils/errorhandler.js";
export const answerResolver = {
  Query: {},
  Mutation: {
    postAnswer: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, body } = args;
      if (body.trim() === "" || body.length < 30) {
        throw new UserInputError(
          "Answer body must be at least 30 characters long"
        );
      }
      try {
        const author = await User.findById(loggedUser.id);
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError("Question not found in database");
        }
        question.answers.push({
          body,
          author: author.id,
        });
        const savedQuestion = await question.save();
        const populatedQuestion = await savedQuestion
          .populate("answers.author", "username")
          .populate("answers.comments.author", "username")
          .execPopulate();
        author.answers.push({
          ansId: savedQuestion.answers[savedQuestion.answers.length - 1]._id,
        });
        await author.save();
        return populatedQuestion.answers;
      } catch (error) {
        throw new Error(errorHandler(error));
      }
    },
  },
};
