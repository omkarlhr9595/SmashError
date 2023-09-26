import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <div className="w-2/3 h-full pt-5 pl-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

const Tags = () => {
  return <h2>Tags Page</h2>;
};
const User = () => {
  return <h2>User Page</h2>;
};
const Home = () => {
  return <h2>Home Page</h2>;
};
