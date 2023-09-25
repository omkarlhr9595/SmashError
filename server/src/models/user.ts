import { Schema, model } from "mongoose";

interface User {
  id: string;
  name: string;
  email: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const UserModel = model<User>("User", userSchema);
