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
