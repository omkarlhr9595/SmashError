import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/Home";
function App() {
  const userAuth = false;
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={
              userAuth ? <Navigate to="/" replace /> : <div>Auth</div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
