import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { QuestionCard } from "../components/question";
const GET_QUESTION = gql`
  mutation GetQuestion($questionId: ID!) {
    getQuestion(id: $questionId) {
      id
      author {
        id
        username
      }
      title
      body
      acceptedAnswer
      tags
      aiAnswer
      upvotedBy
      downvotedBy
      updatedAt
      createdAt
      comments {
        id
      }
      answers {
        id
      }
    }
  }
`;
export const Question = () => {
  const authToken = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [getQuestion, { loading, error }] = useMutation(GET_QUESTION);

  useEffect(() => {
    handleGetQuestion();
  }, []);

  const handleGetQuestion = async () => {
    const response = await getQuestion({
      variables: { questionId: id },
      context: {
        headers: {
          Authorization: authToken,
        },
      },
    });
    setData(response.data.getQuestion);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="h-[80vh] w-full grid place-items-center">
          <CircularProgress size={100} />
        </div>
      ) : null}
      {data ? (
        <div className="w-full h-screen flex items-start justify-center">
          <QuestionCard data={data} />
        </div>
      ) : null}
    </>
  );
};
