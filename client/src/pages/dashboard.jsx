import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setLogout } from "../state/user_state";
import { Navbar } from "../components/navbar";
import { Button, Typography, TextField, Avatar, Divider } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { formatDateAgo } from "../utils/time.js";
const getAllQuestionsQuery = gql`
  query {
    getAllQuestions {
      id
      author {
        id
      }
      title
      tags
      answers {
        body
      }
      acceptedAnswer
      upvotedBy
      downvotedBy
      createdAt
      updatedAt
    }
  }
`;
const Dashboard = () => {
  const { loading, error, data } = useQuery(getAllQuestionsQuery);

  useEffect(() => {
    if (data) {
      console.log(data.getAllQuestions);
    }
  });

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.data.username);
  const uid = useSelector((state) => state.user.data.id);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="h-[85%] flex items-start justify-center w-full">
        <div className="h-full w-[30%] flex items-start justify-center">
          <UserCard username={username} uid={uid} />
        </div>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 2, background: "black" }}
        />
        <div className="h-full w-[70%] pl-5 overflow-y-scroll">
          <Typography variant="h4" color="primary" className="mt-5">
            All Questions
          </Typography>
          {data &&
            data.getAllQuestions.map((question) => {
              return <QuestionCard question={question} />;
            })}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ username, uid }) => {
  return (
    <div className="rounded-lg border-2 border-solid border-bgblack overflow-hidden       w-[80%] mt-[10%] flex">
      <div className="h-1/3 aspect-square w-full p-0 bg-bgblack grid place-items-center">
        <div className="h-24 w-24 ">
          <img
            className="h-full w-full "
            src={`https://secure.gravatar.com/avatar/${uid}?s=164&d=identicon`}
            alt=""
          />
        </div>
      </div>
      <div className="h-2/3 w-full text-center">
        <Typography color="primary" variant="body2" className="mt-5">
          {username.toUpperCase()}
        </Typography>
      </div>
    </div>
  );
};

const QuestionCard = ({ question }) => {
  return (
    <>
      <div
        className="flex mt-5 items-start justify-start h-[150px]  "
        key={question.id}
      >
        <div className="px-10 h-full text-center flex flex-col justify-evenly items-center">
          <Typography variant="h6" className="text-gray-900">
            {question.upvotedBy.length + question.downvotedBy.length}
          </Typography>
          <Typography variant="body1" className="text-gray-500">
            votes
          </Typography>
          <Typography variant="h6" className="text-gray-900">
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
          <div className="flex flex-wrap justify-start items-start">
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
          <div className="flex justify-end h-16 self-end">
            <img
              src={`https://secure.gravatar.com/avatar/${question.author.id}?s=164&d=identicon`}
              alt=""
              className="h-10 w-10 place-self-end"
            />
            <div className="flex flex-col justify-end">
              <Typography variant="caption" className="ml-2">
                asked {formatDateAgo(question.createdAt)}
              </Typography>
              <Typography variant="caption" className="ml-2 text-purple-600">
                OMKARLOHAR
              </Typography>
            </div>
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

export default Dashboard;
