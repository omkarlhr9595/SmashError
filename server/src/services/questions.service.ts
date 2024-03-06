import prisma from "../client";

const ask = async (
  sub: string,
  title: string,
  body: string,
  tags: string[]
) => {
  const question = await prisma.question.create({
    data: {
      aiAnswer: "This is an AI answer",
      content: body,
      title,
      downvote: 0,
      upvote: 0,
      User: {
        connect: {
          sub,
        },
      },
    },
  });

  return question;
};

const getQuestionById = async (id: string) => {
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  return question;
};

export default {
  ask,
  getQuestionById,
};
