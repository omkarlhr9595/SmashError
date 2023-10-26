import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/user_state";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[15%] bg-bgblack flex justify-center items-center">
      <div className="w-2/3 h-full flex justify-between items-center cursor-pointer">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="font-logo font-bold text-4xl text-white"
        >
          SMASHERROR
        </h1>
        <div className="">
          <Button
            className="bg-white py-2 px-4 rounded hover:bg-gray-300 mr-4"
            onClick={() => {
              navigate("/ask");
            }}
          >
            Ask Question
          </Button>
          <Button
            onClick={() => dispatch(setLogout())}
            className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded"
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};
