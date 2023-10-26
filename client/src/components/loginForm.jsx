import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/user_state.js";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/z.schema.js";
import { useMutation, gql } from "@apollo/client";
const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const onSubmit = async (form) => {
    // console.log(form);
    try {
      const response = await loginUser({
        variables: {
          username: form.username,
          password: form.password,
        },
      });
      const user = response.data.login;
      const d_data = {
        data: { id: user.id, username: user.username },
        token: user.token,
      };
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
            LOGIN FORM
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
          <Button type="submit" variant="contained" className="w-1/2 mt-5">
            Login
          </Button>
          {error && (
            <p className="my-5 font-sans text-red-600">{error.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};
