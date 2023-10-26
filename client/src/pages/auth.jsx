import { useState } from "react";
import { LoginForm } from "../components/loginForm.jsx";
import { RegisterForm } from "../components/registerForm.jsx";
import { Typography } from "@mui/material";
const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="bg-[#f5f5f5] h-screen">
      <div className="w-full h-screen">
        <div className="h-[20%] w-full grid place-items-center bg-bgblack">
          <h1 className="text-8xl font-logo text-white ">SMASH ERROR</h1>
        </div>
        <div className="h-[80%] flex flex-col items-center justify-center">
          {login ? <LoginForm /> : <RegisterForm />}
          <Typography
            onClick={() => setLogin(!login)}
            className="mt-5 cursor-pointer text-blue-500 underline"
            variant="h6"
            align="left"
          >
            {login
              ? "Don't have an account? Register here"
              : "Already have an accoung? Login here"}
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
