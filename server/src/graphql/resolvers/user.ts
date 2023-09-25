import { UserModel } from "../../models/user.js";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserModel.find();
    },
  },
  Mutation: {
    signUp: async (_, args) => {
      const user = new UserModel({
        name: args.name,
        email: args.email,
      });

      await user.save();

      return user;
    },
  },
};
