import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AuthPage from "./pages/auth/Auth";
function App() {
  const userAuth = false;
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth"
              element={userAuth ? <Navigate to="/" replace /> : <AuthPage/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
