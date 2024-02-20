import React from "react";
import { cn } from "@/utils/cn";
import { Button } from "./button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] opacity-0 lg:w-[84%]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
export function SpotlightPreview({
  setIsLoading,
}: {
  setIsLoading: (isLoading: boolean) => void;
}) {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="bg-grid-white/[0.02] relative flex h-full w-full overflow-hidden  bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl  flex-col items-center justify-center  p-4 pt-20 md:pt-0">
        <h1 className="select-none bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center font-logo text-4xl font-bold text-transparent md:text-7xl">
          SMASH ERROR
        </h1>
        <p className="select-none mt-4 text-center text-lg text-neutral-200 md:text-2xl">
          Unleash your coding potential and join a community of innovators!
          <br />
          Whether you're a beginner or seasoned coder.
        </p>
        <Button
          className="mt-4 bg-bgblack"
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
  );
}
