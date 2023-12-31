import { UserInputError } from "apollo-server";
import { User } from "../../models/user.js";
import { registerValidator,loginValidator } from "../../utils/validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../utils/config.js";
import { Question } from "../../models/question.js";
export const userResolver = {
  Query: {
    getUsername: async (_, args,context) => {
      const { id } = args;
      const user = await User.findById(id);

      if (!user) {
        throw new UserInputError(`User with id '${id}' does not exist.`);
      }

      return user.username;
    },
    getUser: async (_, args) => {
      const { username } = args;

      if (username.trim() === "") {
        throw new UserInputError("Username must be provided.");
      }

      const user = await User.findOne({
        username: { $regex: new RegExp("^" + username + "$", "i") },
      });

      if (!user) {
        throw new UserInputError(`User '${username}' does not exist.`);
      }

      const recentQuestions = await Question.find({ author: user._id })
        .sort({ createdAt: -1 })
        .select("id title points createdAt")
        .limit(5);

      const recentAnswers = await Question.find({
        answers: { $elemMatch: { author: user._id } },
      })
        .sort({ createdAt: -1 })
        .select("id title points createdAt")
        .limit(5);

      return {
        id: user._id,
        username: user.username,
        questions: user.questions,
        answers: user.answers,
        createdAt: user.createdAt,
        recentQuestions,
        recentAnswers,
      };
    },
    getAllUsers: async () => {
      const allUsers = await User.find({}).select("username createdAt");
      return allUsers;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = registerValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const existingUser = await User.findOne({
        username: { $regex: new RegExp("^" + username + "$", "i") },
      });

      if (existingUser) {
        throw new UserInputError(`Username '${username}' is already taken.`);
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        passwordHash,
      });

      const savedUser = await user.save();
      const token = jwt.sign(
        {
          id: savedUser._id,
        },
        SECRET
      );

      return {
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
        token,
      };
    },

    login: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = loginValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const user = await User.findOne({
        username: { $regex: new RegExp("^" + username + "$", "i") },
      });

      if (!user) {
        throw new UserInputError(`User: '${username}' not found.`);
      }

      const credentialsValid = await bcrypt.compare(
        password,
        user.passwordHash
      );

      if (!credentialsValid) {
        throw new UserInputError("Invalid credentials.");
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        SECRET
      );

      return {
        id: user._id,
        username: user.username,
        token,
      };
    },
  },
};
