import Navbar from "./components/navbar";
import SideNav from "./components/sidenav";
import { AppRoutes } from "./components/routes";
function App() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="w-full h-[90%] flex">
        <SideNav />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
