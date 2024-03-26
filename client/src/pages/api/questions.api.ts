import { BASE_URL } from "@/utils/config";
import axios from "axios";

type AskQuestion = {
  sub: string;
  title: string;
  body: string;
  tags: string[];
  access_token: string;
};

const ask = async (data: AskQuestion) => {
  const response = await axios.post(
    `${BASE_URL}/v1/questions/ask`,
    {
      sub: data.sub,
      title: data.title,
      body: data.body,
      tags: data.tags,
    },
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    },
  );
  return response.data;
};

const getQuestionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/v1/questions/${id}`);

  if (response.data.data === null) throw new Error("Question not found");

  return response.data.data as Question;
};

enum Filter {
  HIGHEST_VOTES = "highest-votes",
  NEWEST = "newest",
  THIS_WEEK = "this-week",
}

const getAllQuestions = async (filter?: Filter) => {
  let url = `${BASE_URL}/v1/questions`;
  if (filter) {
    url += `?filter=${filter}`;
  }
  const response = await axios.get(url);

  return response.data.data;
};

const voteQuestion = async (
  questionId: string,
  vote: "upvote" | "downvote",
  userSub: string,
  access_token: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/v1/questions/vote`,
    {
      questionId,
      vote,
      userSub,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return response.data.data;
};

const addView = async (questionId: string) => {
  const response = await axios.post(
    `${BASE_URL}/v1/questions/${questionId}/views`,
  );
  return response.data.data;
};

const addAnswer = async (
  questionId: string,
  sub: string,
  content: string,
  access_token: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/v1/questions/${questionId}/answer`,
    {
      sub,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  return response.data.data;
};

const getAnswersByQuestionId = async (questionId: string) => {
  const response = await axios.get(
    `${BASE_URL}/v1/questions/${questionId}/answers`,
  );
  return response.data.data;
};

const voteAnswer = async (
  answerId: string,
  vote: "upvote" | "downvote",
  userSub: string,
  access_token: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/v1/questions/answer/vote`,
    {
      answerId,
      vote,
      userSub,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return response.data.data;
};

export {
  ask,
  getQuestionById,
  getAllQuestions,
  Filter,
  voteQuestion,
  addView,
  addAnswer,
  getAnswersByQuestionId,
  voteAnswer,
};
