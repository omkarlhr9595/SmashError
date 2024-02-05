import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Peep from "../../assets/peep-73.svg";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Smash Error | Home";
  }, []);
  return (
    <div className="h-screen w-full overflow-auto  flex flex-col">
      <div className="h-1/3 w-full bg-bgblack">
        <div className="flex justify-center items-center h-full">
          <motion.h1
            className="text-bgwhite text-9xl font-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            SMASH ERROR
          </motion.h1>
        </div>
      </div>
      <div className="h-10 w-full bg-[#ff90e8]"></div>
      <div className="flex-grow w-full flex items-center justify-center">
        <img src={Peep} alt="" />
        <div className="ml-5">
          <h1 className="text-3xl">
            Welcome to IMCC Coding Club! 🚀
          </h1>
          <p className="text-lg mt-8">
            Unleash your coding potential and join a community of innovators!
            Whether you're a beginner or seasoned coder, <br /> Smash Error is
            your gateway to hands-on projects, expert mentorship, and
            cutting-edge tech experiences.
          </p>
          <Button
            className="mt-8 px-10 py-7"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <div className="">
          <h1 className="text-3xl font-mono">
            🚀 Welcome to IMCC Coding Club! 🚀
          </h1>
          <p className="text-lg mt-8">
            <ul className="list-disc pl-10">
              <li>
                Unleash your coding potential and join a community of
                innovators! Whether you're a beginner or seasoned coder, IMCC
                Coding Club is your gateway to hands-on projects, expert
                mentorship, and cutting-edge tech experiences.
              </li>
            </ul>
          </p>
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-mono">🌐 Why Join?</h1>
          <p className="text-lg mt-8">
            <ul className="list-disc pl-10">
              <li>
                Interactive Coding Sessions: Learn by doing with dynamic
                workshops led by experienced mentors.
              </li>
              <li>
                Collaborative Projects: Team up with peers on exciting coding
                projects and build an impressive portfolio.
              </li>
              <li>
                Tech Talks and Competitions: Stay ahead with insights from
                industry experts and showcase your skills in hackathons.
              </li>
            </ul>
          </p>
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-mono">Who We're Looking For:</h1>
          <p className="text-lg  mt-8 pl-10">
            <ul className="list-disc">
              <li>
                Students of All Levels: Open to all skill levels, our club is a
                supportive space for growth and excellence.
              </li>
              <li>
                Mentors and Professionals: Industry experts, join us as mentors
                and guide the next generation of coders.
              </li>
            </ul>
          </p>
        </div>
        <Button className="mt-8 px-10 py-7" onClick={() => navigate("/auth")}>
          GET STARTED
        </Button>
      </div> */
}
