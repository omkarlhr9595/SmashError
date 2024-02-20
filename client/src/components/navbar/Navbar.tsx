import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { useStore } from "@/store/store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MobileNav } from "../sidebar/mobile-nav";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth0();
  const { removeToken, logoutUser } = useStore();
  return (
    <Fragment>
      <div className="h-1 w-full bg-[#ff90e8]"></div>
      <div className="h-16 w-full">
        <div className="flex h-full w-full items-center justify-between px-8 md:px-28">
          <Sheet>
            <SheetTrigger>
              <Menu className="md:hidden" size={24} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetClose asChild>
                  <SheetTitle>
                    <h1 className="cursor-pointer font-logo text-3xl select-none">
                      SMASH ERROR
                    </h1>
                  </SheetTitle>
                </SheetClose>
              </SheetHeader>
              <MobileNav />
            </SheetContent>
          </Sheet>

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
                  <AvatarImage src={user?.picture} />
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
                <DropdownMenuItem
                  onClick={() => {
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                    logoutUser();
                    removeToken();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-300"></div>
    </Fragment>
  );
};

export default Navbar;
