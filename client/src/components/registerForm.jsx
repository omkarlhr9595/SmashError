import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "../utils/z.schema";
import { TextField, Button, Typography } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state/user_state";

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;
export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (form) => {
    try {
      const response = await registerUser({
        variables: {
          username: form.username,
          password: form.password,
        },
      });
      // Assuming your mutation returns a user object with an ID and token
      const user = response.data.register;
      const d_data = {
        data: { id: user.id, username: user.username },
        token: user.token,
      };
      console.log(d_data);
      dispatch(setLogin(d_data));
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-96 aspect-video outline rounded-lg flex flex-col items-center justify-center">
          <Typography variant="h5" className="mb-5">
            REGISTRATION FORM
          </Typography>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                className="w-1/2"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="w-1/2 mt-5"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                className="w-1/2 mt-5"
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
              />
            )}
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button type="submit" variant="contained" className="w-1/2 mt-5">
              Register
            </Button>
          )}
          {error && (
            <p className="my-5 font-sans text-red-600">{error.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};
