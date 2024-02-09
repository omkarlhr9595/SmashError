import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Peep from "../../assets/peep-73.svg";
import { useNavigate } from "react-router-dom";
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Smash Error | Home";
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-[35%] items-center justify-center bg-bgblack">
        <motion.h1
          className="font-logo text-6xl text-bgwhite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          SMASH ERROR
        </motion.h1>
      </div>
      <div className=" h-screen w-[3%] bg-[#ff90e8]"></div>
      {/* below div should take remaining space */}
      <div className="flex h-screen flex-grow items-center justify-center bg-bgwhite">
        <div className="flex w-full items-center justify-center">
          <img src={Peep} className="h-60 w-[20%]" alt="" />
          <div className="w-[60%]">
            <h1 className="text-4xl">Welcome to IMCC Coding Club! 🚀</h1>
            <p className="mt-4 text-base">
              Unleash your coding potential and join a community of innovators!
              Whether you're a beginner or seasoned coder.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
