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
      user: {
        connect: {
          sub,
        },
      },
      tags,
    },
  });
  return question;
};

const getQuestionById = async (id: string) => {
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      upvote: true,
      downvote: true,
      answer: true,
      comment: true,
    },
  });

  return question;
};

const getAllQuestionsByHighestVotes = async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: true, // Include the User relation
      upvote: true, // Include the upvote relation
      downvote: true, // Include the downvote relation
      answer: true, // Include the Answer relation
      comment: true, // Include the comment relation
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
      upvote: true, // Include the upvote relation
      downvote: true, // Include the downvote relation
      answer: true, // Include the Answer relation
      comment: true, // Include the comment relation
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
      upvote: true, // Include the upvote relation
      downvote: true, // Include the downvote relation
      answer: true, // Include the Answer relation
      comment: true, // Include the comment relation
    },
  });

  return questions;
};

const getAllQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: true, // Include the User relation
      upvote: true, // Include the upvote relation
      downvote: true, // Include the downvote relation
      answer: true, // Include the Answer relation
      comment: true, // Include the comment relation
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
    include: {
      upvote: true,
      downvote: true,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const isUpvoted = question.upvote.some((upvote) => upvote.sub === userSub);
  const isDownvoted = question.downvote.some(
    (downvote) => downvote.sub === userSub
  );

  const voted = isUpvoted || isDownvoted;

  if (voted) {
    if (isUpvoted) {
      if (vote === "upvote") {
        await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            upvote: {
              disconnect: {
                sub: userSub,
              },
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
              disconnect: {
                sub: userSub,
              },
            },
            downvote: {
              connect: {
                sub: userSub,
              },
            },
          },
        });
      }
    }
    if (isDownvoted) {
      if (vote === "downvote") {
        await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            downvote: {
              disconnect: {
                sub: userSub,
              },
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
              disconnect: {
                sub: userSub,
              },
            },
            upvote: {
              connect: {
                sub: userSub,
              },
            },
          },
        });
      }
    }
  } else {
    if (vote === "upvote") {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          upvote: {
            connect: {
              sub: userSub,
            },
          },
        },
      });
    }

    if (vote === "downvote") {
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          downvote: {
            connect: {
              sub: userSub,
            },
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

export default {
  ask,
  getQuestionById,
  getAllQuestionsByHighestVotes,
  getAllQuestionsByNewest,
  getAllQuestionsThisWeek,
  getAllQuestions,
  voteQuestion,
  addView,
};
