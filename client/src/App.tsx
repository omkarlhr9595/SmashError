import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
import AuthPage from "./pages/auth/Auth";
function App() {
  const userAuth = false;
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={userAuth ? <Navigate to="/" replace /> : <AuthPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
