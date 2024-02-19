import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Peep from "../../assets/peep-73.svg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingPage } from "@/components/loading_page/loading_page";
import { SmashErrorBG } from "@/components/ui/background-beams";
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    document.title = "Smash Error | Home";
  }, []);
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex h-screen w-full">
      <SmashErrorBG />
      <div className=" h-screen w-[3%] bg-[#ff90e8]"></div>
      {/* below div should take remaining space */}
      <div className="flex h-screen flex-grow items-center justify-center bg-bgwhite">
        <div className="flex w-full items-center justify-center">
          <img src={Peep} className="h-60 w-[20%]" alt="" />
          <div className="w-[75%]">
            <h1 className="text-4xl">Welcome to IMCC Coding Club! 🚀</h1>
            <p className="mt-4 text-base">
              Unleash your coding potential and join a community of innovators!
              Whether you're a beginner or seasoned coder.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setIsLoading(true);
                if (isAuthenticated) navigate("/dashboard");
                else
                  loginWithRedirect({
                    authorizationParams: {
                      prompt: "login",
                      scope: "openid profile email",
                    },
                  });
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
