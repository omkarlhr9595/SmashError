import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "./pages/user";
import AuthPage from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { Ask } from "./pages/ask";
import { Question } from "./pages/question";

const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/ask"
            element={
              userAuth ? <Ask /> : <Navigate to="/auth" replace={true} />
            }
          />
          <Route
            path="/"
            element={
              userAuth ? <Dashboard /> : <Navigate to="/auth" replace={true} />
            }
          />

          <Route path="question/:id" element={<Question />} />
          <Route path="user/:username" element={<User />} />
          {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
