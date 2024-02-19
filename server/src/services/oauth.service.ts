import { Role } from "@prisma/client";
import prisma from "../client";

const getUserDetails = async (
  sub: string,
  name: string,
  nickname: string,
  email: string,
  picture: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      sub: sub,
    },
  });

  if (!user) {
    const registeredUser = registerUser(sub, name, nickname, email, picture);
    return registeredUser;
  }

  return user;
};

const registerUser = async (
  sub: string,
  name: string,
  nickname: string,
  email: string,
  picture: string
) => {
  const coreMemberList = ["omkarlohar91@gmail.com"];

  const userExists = await prisma.user.findUnique({
    where: {
      sub: sub,
    },
  });

  if (userExists) {
    return userExists;
  }

  const user = await prisma.user.create({
    data: {
      sub: sub,
      name: name,
      nickname: nickname,
      email: email,
      picture: picture,
      points: 0,
      role: coreMemberList.includes(email) ? Role.Core : Role.Member,
    },
  });

  return user;
};

export default {
  getUserDetails,
};
