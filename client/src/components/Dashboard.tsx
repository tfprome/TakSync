import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-full w-full shadow-lg bg-blue-900 text-white">
      <div className="flex flex-col md:flex-col p-4 gap-3 font-semibold">
        <Link
          to="/home/tasklist"
          className="hover:bg-blue-700 p-2 rounded text-center"
        >
          Task List
        </Link>
        <Link
          to="/home/kanban"
          className="hover:bg-blue-700 p-2 rounded text-center"
        >
          Kanban Board
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
