import { Mentor, Role, User } from "@prisma/client";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { encryptPassword } from "../utils/encryption";
import httpStatus from "http-status";
const createUser = async (
  email: string,
  password: string,
  name: string,
  rollNo: number,
  className: string,
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }
  if(await getMentorByEmail(email)){
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }
  const coreMembers = ["omkarlohar91@gmail.com"];
  const role = coreMembers.includes(email) ? Role.Core : Role.Member;
  return await prisma.user.create({
    data: {
      email,
      password: await encryptPassword(password),
      name,
      rollNo,
      className,
      role,
      points: 0,
    },
  });
};


const createMentor = async (
  email: string,
  password: string,
  name: string,
): Promise<Mentor> => {
  if (await getMentorByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }
  if(await getUserByEmail(email)){
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }
  return await prisma.mentor.create({
    data: {
      email,
      password: await encryptPassword(password),
      name,
      experience: 0,
      linkedIn:"",
      organization:"",
      profilePic:"",
    },
  });
}

const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    "id",
    "name",
    "email",
    "password",
    "rollNo",
    "className",
    "points",
    "role",
    "createdAt",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  
  
  return await prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

const getMentorByEmail = async <Key extends keyof Mentor>(
  email: string,
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "experience",
    "role",
    "linkedIn",
    "organization",
    "profilePic",
    "createdAt",
  ] as Key[]
): Promise<Pick<Mentor, Key> | null> => {
  return prisma.mentor.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<Mentor, Key> | null>;
}


export default { createUser,createMentor, getUserByEmail,getMentorByEmail };
