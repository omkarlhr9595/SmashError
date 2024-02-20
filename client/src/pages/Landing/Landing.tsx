import React, { useEffect } from "react";
import { LoadingPage } from "@/components/loading_page/loading_page";
import { SpotlightPreview } from "@/components/ui/spotlight";

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    document.title = "Smash Error | Home";
  }, []);
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex h-screen w-full">
      <SpotlightPreview setIsLoading={setIsLoading} />
    </div>
  );
};

export default LandingPage;
