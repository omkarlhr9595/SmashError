import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import AuthPage from "./pages/auth";

const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));

  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={userAuth ? <Home /> : <Navigate to="/auth" replace={true} />}
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
