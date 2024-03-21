import axios from "axios";
import prisma from "../client";
import config from "../config/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const ask = async (
  sub: string,
  title: string,
  body: string,
  tags: string[]
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      sub,
    },
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  try {
    const { data } = await axios.post(
      `${config.geminiApiUri}`,
      {
        contents: [
          {
            parts: [
              {
                text: title + "\n" + body + "\n" + tags.join(","),
              },
            ],
          },
        ],
      },
      {
        headers: {
          "x-api-key": config.geminiApiKey,
        },
      }
    );

    const aiAnswer =
      data.candidates[0]?.content?.parts[0]?.text ??
      "We are sorry, we could not generate an answer for you by AI at the moment. Please try again later.";

    const question = await prisma.question.create({
      data: {
        aiAnswer,
        content: body,
        title,
        user: {
          connect: {
            sub,
          },
        },
        tags,
      },
    });
    return question;
  } catch (error) {
    console.log({ error });
  }
};

const getQuestionById = async (id: string) => {
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      answer: true,
    },
  });

  return question;
};

const getAllQuestionsByHighestVotes = async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: true, // Include the User relation
      answer: true, // Include the Answer relation
    },
  });

  // Calculate the vote for each question
  const questionsWithVote = questions.map((question) => ({
    ...question,
    vote: question.upvote.length - question.downvote.length,
  }));

  // Sort the questions by vote in descending order
  const questionsSortedByVote = questionsWithVote.sort(
    (a, b) => b.vote - a.vote
  );

  return questionsSortedByVote;
};

const getAllQuestionsByNewest = async () => {
  const questions = await prisma.question.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true, // Include the User relation
      answer: true, // Include the Answer relation
    },
  });

  return questions;
};

const getAllQuestionsThisWeek = async () => {
  const questions = await prisma.question.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    include: {
      user: true, // Include the User relation
      answer: true, // Include the Answer relation
    },
  });

  return questions;
};

const getAllQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: true, // Include the User relation
      answer: true, // Include the Answer relation
    },
  });

  return questions;
};

const voteQuestion = async (
  questionId: string,
  userSub: string,
  vote: "upvote" | "downvote"
) => {
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      sub: userSub,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isUpvoted = question.upvote.find((u) => u === userSub);
  const isDownvoted = question.downvote.find((u) => u === userSub);

  if (vote === "upvote") {
    if (isUpvoted) {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          upvote: {
            set: question.upvote.filter((u) => u !== userSub),
          },
        },
      });
    } else {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          upvote: {
            push: userSub,
          },
          downvote: {
            set: question.downvote.filter((u) => u !== userSub),
          },
        },
      });
    }
  } else {
    if (isDownvoted) {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          downvote: {
            set: question.downvote.filter((u) => u !== userSub),
          },
        },
      });
    } else {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          downvote: {
            push: userSub,
          },
          upvote: {
            set: question.upvote.filter((u) => u !== userSub),
          },
        },
      });
    }
  }
};

const addView = async (questionId: string) => {
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};

const addAnswer = async (questionId: string, sub: string, content: string) => {
  const userExists = await prisma.user.findUnique({
    where: {
      sub,
    },
  });
  if (!userExists) {
    throw new Error("User not found");
  }

  const questionExists = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!questionExists) {
    throw new Error("Question not found");
  }

  const answer = await prisma.answer.create({
    data: {
      content,
      question: {
        connect: {
          id: questionId,
        },
      },
      user: {
        connect: {
          sub,
        },
      },
    },
  });

  return answer;
};

export default {
  ask,
  getQuestionById,
  getAllQuestionsByHighestVotes,
  getAllQuestionsByNewest,
  getAllQuestionsThisWeek,
  getAllQuestions,
  voteQuestion,
  addView,
  addAnswer,
};
