import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
import AuthPage from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/dashboard";
function App() {
  const userAuth = false;
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
