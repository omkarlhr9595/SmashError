import { Navbar } from "../components/navbar";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { CircularProgress, Divider, Typography, Skeleton } from "@mui/material";
import { UserCard } from "./dashboard";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { formatDateAgo } from "../utils/time.js";
const getUserQuery = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      username
      createdAt
      questions {
        quesId
      }
    }
  }
`;

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const { loading, error } = useQuery(getUserQuery, {
    variables: { username: username },
    onCompleted: (data) => {
      setUser(data.getUser);
    },
  });
  if (loading)
    return (
      <div className="h-screen">
        <Navbar />
        <div className="h-[85%] w-full grid place-items-center">
          <CircularProgress size={100} />
        </div>
      </div>
    );
  if (user)
    return (
      <div className="h-screen w-full">
        <Navbar />
        <div className="h-[85%] flex items-start justify-center w-full">
          <div className="h-full w-[30%] flex items-start justify-center">
            <UserCard username={user.username} uid={user.id} />
          </div>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: 2, background: "black" }}
          />
          <div className="h-full w-[70%] pl-5 overflow-y-scroll">
            <Typography variant="h4" color="primary" className="mt-5">
              All Questions By {user.username}
            </Typography>
            {user.questions.map((question) => {
              return (
                <QuestionCard key={question.quesId} id={question.quesId} />
              );
            })}
          </div>
        </div>
      </div>
    );
};

const getQuestionQuery = gql`
  query getQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      title
      body
      tags
      answers {
        id
      }
      createdAt
    }
  }
`;

const QuestionCard = ({ id }) => {
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();
  const { loading, error } = useQuery(getQuestionQuery, {
    variables: { id: id },
    onCompleted: (data) => {
      setQuestion(data.getQuestion);
    },
  });

  if (loading)
    return (
      <div className="mt-5">
        <Skeleton
          className="rounded-lg"
          variant="rectangular"
          width="95%"
          height="150px"
          animation="wave"
        />
      </div>
    );
  if (question)
    return (
      <>
        <div
          className="flex mt-5 items-start justify-start h-[150px]  "
          key={question.id}
        >
          <div className="px-10 h-full text-center flex flex-col justify-start items-center">
            <Typography variant="h6" className="text-gray-900 mt-10">
              {question.answers.length}
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              answers
            </Typography>
          </div>
          <div className="h-full flex flex-col items-start justify-between w-4/5 ">
            <Typography
              component={RouterLink}
              to={`/question/${question.id}`}
              variant="h6"
              color="primary"
              className="cursor-pointer no-underline hover:underline"
            >
              {question.title}
            </Typography>
            <Typography variant="body1" className="text-gray-500 mt-3">
              {question.body}
            </Typography>
            <div className="flex mt-3 flex-wrap justify-start items-start">
              {question.tags.map((tag, ind) => {
                return (
                  <p
                    key={tag}
                    className={`text-xs font-sans bg-purple-100 text-purple-700 border-solid border border-purple-700 w-min px-2 py-1 rounded-3xl ${
                      ind > 0 ? "ml-2" : ""
                    }`}
                  >
                    {tag.toUpperCase()}
                  </p>
                );
              })}
            </div>
            <div className="flex w-1/2 justify-end h-16 self-end">
              <Typography variant="caption" className="ml-2">
                asked {formatDateAgo(question.createdAt)}
              </Typography>
              <div className="w-1/2"></div>
            </div>
          </div>
        </div>
        <Divider
          className="mt-5 mr-5"
          sx={{ borderRightWidth: 2, background: "black" }}
        />
      </>
    );
};

export default User;
