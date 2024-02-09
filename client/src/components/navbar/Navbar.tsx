import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="h-1 w-full bg-[#ff90e8]"></div>
      <div className="h-16 w-full">
        <div className="flex h-full w-full items-center justify-between px-32">
          <h1
            className="cursor-pointer font-logo text-3xl"
            onClick={() => {
              navigate("/");
            }}
          >
            SMASH ERROR
          </h1>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
