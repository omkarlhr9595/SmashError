import React, { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Smash Error | Dashboard";
  }, []);
  return (
    <div className="h-screen w-full bg-bgwhite">
      <Navbar />
      <div className="h-[1px] w-full bg-gray-300"></div>
    </div>
  );
};
export default Dashboard;
