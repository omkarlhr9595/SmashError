import {
  TextField,
  Typography,
  Button,
  Autocomplete,
  CircularProgress,
  Box,
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

const POST_QUESTION = gql`
  mutation PostQuestion(
    $questionTitle: String!
    $questionBody: String!
    $questionTags: [String!]
  ) {
    postQuestion(
      title: $questionTitle
      body: $questionBody
      tags: $questionTags
    ) {
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

  const [postQuestion, { loading }] = useMutation(POST_QUESTION);
  const [tags, setTags] = useState(["error", "smash"]);
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.user.token);

  const onSubmit = async (form) => {
    console.log("Title:", form.title);
    console.log("Body:", form.body);
    // console.log("Tags:", tags);
    console.log(authToken);
    try {
      const response = await postQuestion({
        variables: {
          questionTitle: form.title.toString(),
          questionBody: form.body.toString(),
          questionTags: ["error", "smash"],
        },
        context: {
          headers: {
            Authorization: authToken,
          },
        },
      });

      if (response.data && response.data.postQuestion) {
        navigate(`/question/${response.data.postQuestion.id}`);
      }
    } catch (error) {
      console.error("Error posting the question:", error.message);
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <div className="h-[85%]">
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
              <Autocomplete
                style={{ margin: "10px 0" }}
                multiple
                id="tags-outlined"
                options={tags}
                defaultValue={[...tags]}
                freeSolo
                autoSelect
                onChange={(e) => setTags([...tags, e.target.value])}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags Feature is not yet implemented"
                    placeholder="Tags Feature is not yet implemented"
                    value={tags}
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
