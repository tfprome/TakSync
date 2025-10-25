import Navbar from "./navbar";
import Dashboard from "./Dashboard";
import Progression from "./progressbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col md:flex-row w-full flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/5 bg-blue-900">
          <Dashboard />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/5 p-4 overflow-y-auto">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/5 bg-gray-50 border-t md:border-t-0 md:border-l">
          <Progression />
        </div>
      </div>
    </div>
  );
};

export default Home;
