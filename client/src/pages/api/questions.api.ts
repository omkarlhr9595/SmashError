import { BASE_URL } from "@/utils/config";
import axios from "axios";

type Question = {
  sub: string;
  title: string;
  body: string;
  tags: string[];
  access_token: string;
};

const ask = async (data: Question) => {
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

type getQuestionById = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  upvote: number;
  downvote: number;
};

const getQuestionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/v1/questions/${id}`);
  console.log(response.data.data);

  if (response.data.data === null) throw new Error("Question not found");

  return response.data.data as getQuestionById;
};

export { ask, getQuestionById };
