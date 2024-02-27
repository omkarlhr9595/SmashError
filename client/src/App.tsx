import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AskPage, LandingPage, DashboardPage, ProfilePage } from "./pages";
type AppProps = {};
const App: React.FC<AppProps> = () => {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
