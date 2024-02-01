import React, { useEffect } from "react";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Smash Error | Home";
  }, []);
  return <div>Home</div>;
};

export default HomePage;
