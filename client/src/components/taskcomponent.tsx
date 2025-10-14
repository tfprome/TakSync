import  { useState,useEffect } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addtask, deletetask, fetchtask } from "../features/taskislice";

const TaskComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(()=>{
      dispatch(fetchtask())
  },[])

  const handleadd = () => {
    if (title) {
      dispatch(addtask({ title, desc, status: "to-do" }));
      setTitle("");
      setDesc("");
    } else alert("Please enter a task title");
  };

  const handledelete = (id: string) => {
    dispatch(deletetask(id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          📝 Task Manager
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task Title"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleadd}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet.</p>
          )}
          {tasks.map((task) => (
            <li
              key={String(task._id)}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
            >
              <div>
                <p className="font-medium text-gray-800">{task.title}</p>
                {task.desc && (
                  <p className="text-sm text-gray-500">{task.desc}</p>
                )}
              </div>
              <button
                onClick={() => handledelete(String(task._id))}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskComponent;
