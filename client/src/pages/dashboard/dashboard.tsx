import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const Dashboard: React.FC = () => {
  return (
    <div className="h-screen bg-bgwhite w-full">
      <div className="h-1 w-full bg-[#ff90e8]"></div>
      <div className="h-16 w-full">
        <div className="flex items-center justify-between h-full w-full px-32">
          <h1 className="text-3xl font-logo">SMASH ERROR</h1>
          <div className="flex items-center">
            <h1 className="text-xl mr-10">Welcome, User!</h1>
            <Button className=" px-5 py-3 rounded-md">Logout</Button>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
};
export default Dashboard;
