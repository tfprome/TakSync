import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Progression = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) =>
      task.status &&
      (task.status.toLowerCase() === "done" ||
        task.status.toLowerCase() === "completed")
  ).length;

  const inprogressTasks=tasks.filter(
    (task)=>task.status && task.status.toLowerCase()=== 'in progress').length

  const inprogressPercent= totalTasks===0?0: Math.round((inprogressTasks/totalTasks)*100)

  const completedPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const incompletePercent = 100 - completedPercent- inprogressPercent;

  return (
    
    <div className="w-full bg-gray-50 h-screen p-6 shadow-inner">
      <h2 className="text-xl font-bold mb-6">Progress Overview</h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${completedPercent}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        <p className="shadow-md rounded-md pl-3 py-4 font-semibold">
           Completed:{" "}
          <span className="text-green-600 font-semibold">
            {completedPercent}%
          </span>
        </p>
        <p className="shadow-md rounded-md pl-3 py-4 font-semibold">
           In Progress:{" "}
          <span className="text-green-600 font-semibold">
            {inprogressPercent}%
          </span>
        </p>
        <p className="shadow-md rounded-md pl-3 py-4 font-semibold">
           To Do:{" "}
          <span className="text-yellow-600 font-semibold">
          {totalTasks===0?"0%":`${incompletePercent}%`}
          </span>
        </p>
        <p className="shadow-md rounded-md pl-3 py-4 font-semibold">
           Total Tasks:{" "}
          <span className="text-blue-600 font-semibold">{totalTasks}</span>
        </p>
      </div>
    </div>
  );
};

export default Progression;
