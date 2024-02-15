import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing/Landing";
import ProfilePage from "./pages/profile/Profile";
import DashboardPage from "./pages/dashboard/dashboard";
type AppProps = {};
const App: React.FC<AppProps> = () => {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
