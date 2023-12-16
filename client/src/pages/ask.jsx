import {
  TextField,
  Typography,
  Button,
  Autocomplete,
  Snackbar,
  SnackbarContent,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import { Navbar } from "../components/navbar";
import { askQuestionSchema } from "../utils/z.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const POST_QUESTION_MUTATION = gql`
  mutation postQuestion($title: String!, $body: String!, $tags: [String!]!) {
    postQuestion(title: $title, body: $body, tags: $tags) {
      id
    }
  }
`;

export const Ask = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(askQuestionSchema),
  });

  const navigate = useNavigate();
  const authToken = useSelector((state) => state.user.token);

  const [postQuestionMutation, { loading, error, data }] = useMutation(
    POST_QUESTION_MUTATION,
  );

  const onSubmit = async (form) => {
    const tags = form.tags.split(",");
    const response = await postQuestionMutation({
      variables: {
        title: form.title,
        body: form.body,
        tags: tags,
      },
      context: {
        headers: {
          authorization: authToken,
        },
      },
    });
    if (response.data) {
      console.log(response.data);
      navigate(`/question/${response.data.postQuestion.id}`);
    } else if (error) {
      handleSnackbarOpen(error.message);
    }
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setErrorMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div className="h-[85%]">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={errorMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              {/* Add close icon here */}
            </IconButton>
          }
        />
      </Snackbar>
      <Navbar />
      <div className="flex flex-col h-full items-center justify-start">
        <div className="w-1/2 h-full ">
          <Typography variant="h4" className="mt-5">
            Ask a question
          </Typography>
          {loading ? (
            <div className="h-[80vh] w-full grid place-items-center">
              <CircularProgress size={100} />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    className="w-full"
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                  />
                )}
              />
              <div className="mt-5"></div>
              <Controller
                name="body"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={5}
                    label="Body"
                    className="w-full"
                    error={!!errors.body}
                    helperText={errors.body ? errors.body.message : ""}
                  />
                )}
              />
              <div className="mt-5"></div>
              <Controller
                name="tags"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tags"
                    className="w-full"
                    error={!!errors.tags}
                    helperText={
                      errors.tags
                        ? errors.tags.message
                        : "Tags are separated by commas"
                    }
                  />
                )}
              />
              <Button type="submit" variant="contained" className="w-1/2 mt-5">
                Post Your Question
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
