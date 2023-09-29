import { authChecker } from "../../utils/authchecker.js";
import { questionValidator } from "../../utils/validators.js";
import { UserInputError } from "apollo-server";
import { User } from "../../models/user.js";
import { Question } from "../../models/question.js";
import { errorHandler } from "../../utils/errorhandler.js";
import { AiAnswer } from "../../models/aianswer.js";
import { PALM_URI } from "../../utils/config.js";
import axios from "axios";
export const questionResolver = {
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
        const newQuestion = new Question({
          title,
          body,
          tags,
          author: author._id,
        });
        const savedQues = await newQuestion.save();
        const populatedQues = await savedQues
          .populate("author", "username")
          .execPopulate();

        author.questions.push({ quesId: savedQues._id });
        await author.save();

        const res = await axios.post(PALM_URI, {
          prompt: {
            text: title + " " + body,
          },
        });

        // console.log(res);
        const ans = res.data.candidates[0].output;
        console.log(ans);
        const aians = new AiAnswer({
          questionId: savedQues._id,
          body: ans,
        });
        await aians.save();
        return populatedQues;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
  },
};
