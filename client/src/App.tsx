import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  LandingPage,
  DashboardPage,
  ProfilePage,
  QuestionByIdPage,
} from "./pages";
import { Toaster } from "@/components/ui/sonner";
type AppProps = {};
const App: React.FC<AppProps> = () => {
  return (
    <>
      <div className="h-screen w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/question/:id" element={<QuestionByIdPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster />
    </>
  );
};

export default App;
