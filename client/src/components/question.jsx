import {
  Divider,
  Typography,
  Button,
  Checkbox,
  SvgIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from "@mui/material";
import { formatDateAgo } from "../utils/time";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { answerSchema } from "../utils/z.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const deleteQuestionMutation = gql`
  mutation DeleteQuestion($quesId: ID!) {
    deleteQuestion(quesId: $quesId)
  }
`;

const postAnswerMutation = gql`
  mutation PostAnswer($quesId: ID!, $body: String!) {
    postAnswer(quesId: $quesId, body: $body) {
      id
    }
  }
`;

export const QuestionCard = ({ data }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(answerSchema),
  });
  const [deleteQuestion, { loading, error }] = useMutation(
    deleteQuestionMutation,
  );
  const [postAnswer, { loading: answerLoading, error: answerError }] =
    useMutation(postAnswerMutation);
  const userID = useSelector((state) => state.user.data.id);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteConfirmation = () => {
    setModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteQuestion({
      variables: { quesId: data.id },
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    navigate("/");
    setModalOpen(false);
  };
  const onSubmit = async (form) => {
    postAnswer({
      variables: {
        quesId: data.id,
        body: form.body,
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    location.reload();
  };
  return (
    <div className="mt-5 h-min w-1/2 ">
      <div className="flex w-full items-center justify-between">
        <Typography variant="h5"> {data.title}</Typography>
        {userID === data.author.id ? (
          <div className="">
            <Button
              variant="contained"
              className="bg-red-600"
              onClick={handleDeleteConfirmation}
            >
              DELETE
            </Button>
            <Dialog open={isModalOpen} onClose={handleDeleteCancel}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to delete this question?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel}>Cancel</Button>
                <Button onClick={handleDeleteConfirm} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </div>
      <Typography variant="body1">
        Asked {formatDateAgo(data.createdAt)}
      </Typography>

      <Divider className="my-2" />
      <div className="flex h-full">
        {/* <div className="w-[10%] h-1/2 flex flex-col justify-evenly items-center">
          <ArrowDropUpIcon
            className="cursor-pointer"
            sx={{ fontSize: 50, padding: 0, margin: 0 }}
          />
          <Typography variant="h6">{data.upvotedBy.length}</Typography>
          <ArrowDropDownIcon className="cursor-pointer" sx={{ fontSize: 50 }} />
        </div> */}
        <div className="w-[90%] h-1/2">
          <Typography variant="body1">{data.body}</Typography>
          <div className="flex flex-wrap justify-start items-start">
            {data.tags.map((tag, ind) => {
              return (
                <p
                  key={tag + ind}
                  className={` ${
                    ind > 0 ? "ml-2" : ""
                  } mt-3 font-sans bg-purple-100 text-purple-700 border-solid border border-purple-700 w-min px-3 py-1 rounded-3xl`}
                >
                  {tag.toUpperCase()}
                </p>
              );
            })}
          </div>
          {data.answers.length > 0 ? (
            <div className="mt-5">
              <Typography variant="h6" className=" text-blue-700 font-bold">
                Answers By Users
              </Typography>
              {data.answers.map((ans) => (
                <div
                  key={ans.id}
                  className="py-3 px-2 bg-purple-100 my-3 w-full rounded border-solid border border-purple-700"
                >
                  <Typography className="text-purple-700">
                    {ans.body}
                  </Typography>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className={`w-full ${data.answers.length == 0 ? "mt-2" : null}`}>
        {/*answer form*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Answer body"
                className="w-[90%]"
                error={!!errors.body}
                helperText={errors.body ? errors.body.message : ""}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            className="mt-2 bg-blue-700"
          >
            Post Your Answer
          </Button>
        </form>
      </div>
      <div className="mt-5">
        <Typography variant="h6" className=" text-blue-700 font-bold">
          Answer By AI
        </Typography>
        <Markdown
          className="font-sans text-xl"
          rehypePlugins={[rehypeHighlight]}
        >
          {data.aiAnswer}
        </Markdown>
        {/* <SyntaxHighlighter language="dart" style={solarizedlight}>
          {data.aiAnswer}
        </SyntaxHighlighter> */}
      </div>
      <Divider className="my-5" />
    </div>
  );
};
