import { authChecker } from "../../utils/authchecker.js";
import { questionValidator } from "../../utils/validators.js";
import { UserInputError } from "apollo-server";
import { User } from "../../models/user.js";
import { Question } from "../../models/question.js";
import { errorHandler } from "../../utils/errorhandler.js";
import { PALM_URI } from "../../utils/config.js";
import axios from "axios";
export const questionResolver = {
  Query: {
    getAllQuestions: async (_, args, context) => {
      const result = await Question.find({});
      try {
        const resultsAsStringIDs = result.map((doc) => ({
          id: doc._id.toString(),
          author: doc.author
            ? { id: doc.author.toString(), username: doc.author.username }
            : null,
          title: doc.title,
          body: doc.body,
          tags: doc.tags,
          acceptedAnswer: doc.acceptedAnswer
            ? doc.acceptedAnswer.toString()
            : null,
          comments: doc.comments,
          aiAnswer: doc.aiAnswer,
          answers: doc.answers,
          upvotedBy: doc.upvotedBy,
          downvotedBy: doc.downvotedBy,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }));
        return resultsAsStringIDs;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  Mutation: {
    postQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { title, body, tags } = args;

      const { errors, valid } = questionValidator(title, body, tags);
      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      try {
        const author = await User.findById(loggedUser.id);
        const res = await axios.post(PALM_URI, {
          prompt: {
            text: title + " " + body,
          },
        });
        const ans = res.data.candidates[0].output;
        const newQuestion = new Question({
          title,
          body,
          tags,
          author: author._id,
          aiAnswer: ans,
        });

        const savedQues = await newQuestion.save();
        const populatedQues = await savedQues
          .populate("author", "username")
          .execPopulate();

        author.questions.push({ quesId: savedQues._id });
        await author.save();

        // console.log(res);
        // const aians = new AiAnswer({
        //   questionId: savedQues._id,
        //   body: ans,
        // });
        // await aians.save();
        return populatedQues;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    getQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { id } = args;
      try {
        const question = await Question.findById(id);
        const user = await User.findById(question.author);
        return {
          id: question.id,
          author: { id: user.id, username: user.username },
          title: question.title,
          body: question.body,
          tags: question.tags,
          acceptedAnswer: question.acceptedAnswer
            ? question.acceptedAnswer
            : null,
          comments: question.comments,
          answers: question.answers,
          upvotedBy: question.upvotedBy,
          downvotedBy: question.downvotedBy,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        };
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

// id: ID!
// author: Author!
// title: String!
// body: String!
// tags: [String!]!
// acceptedAnswer: ID
// comments: [Comment]!
// answers: [Answer]!
// upvotedBy: [ID]!
// downvotedBy: [ID]!
// createdAt: DateTime!
// updatedAt: DateTime!
