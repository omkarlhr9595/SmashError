import { ModeToggle } from "./mode-toggle";

import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <div className="w-full h-[10%] grid  place-items-center border-b-2">
      <div className="w-1/2 h-full flex items-center justify-around">
        <h1 className="text-2xl mr-16">SMASH ERROR</h1>
        <div className="relative w-80">
          <SearchIcon />
          <Input
            type="text"
            placeholder="Search questions..."
            className="pl-12 pr-4"
          />
        </div>
        <AuthDialogs />
        <ModeToggle />
      </div>
    </div>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

const AuthDialogs = () => {
  return <></>;
};

export default Navbar;
