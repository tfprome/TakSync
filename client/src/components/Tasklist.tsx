import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { fetchtask, updatetask, deletetask } from "../features/taskislice";
import AddTaskForm from "./AddTask";
import type { Task } from "../features/taskislice";

const statusColors: Record<string, string> = {
  done: "bg-green-200 text-green-700",
  "in progress": "bg-yellow-200 text-yellow-700",
  todo: "bg-gray-200 text-gray-700",
};

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    dispatch(fetchtask());
  }, [dispatch]);

  // Start editing mode for a specific task
  const startEdit = (task: Task) => {
    setEditId(String(task._id));
    setEditTitle(task.title);
    setEditDesc(task.desc || "");
  };

  // Save updates
  const handleUpdate = () => {
    if (!editId) return;
    dispatch(
      updatetask({
        id: editId,
        data: { title: editTitle, desc: editDesc },
      })
    );
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  // Delete a task
  const handleDelete = (id: string) => {
    dispatch(deletetask(id));
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ml-3 text-center">Task List</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-gradient-to-r from-purple-300 to-purple-600 cursor-pointer
            text-black py-2 px-3 rounded-lg md:w-1/6 hover:from-purple-300 hover:to-blue-600 transition-all"
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const status = task.status?.toLowerCase() || "todo";
            const isEditing = editId === String(task._id);

            return (
              <li
                key={task._id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border p-2 rounded-md"
                      placeholder="Edit title"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full border p-2 rounded-md"
                      placeholder="Edit description"
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {task.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[status]}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">{task.desc || "No description"}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(task)}
                          className="shadow-md rounded-md py-1 px-2 bg-amber-300 hover:bg-amber-400"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(String(task._id))}
                          className="shadow-md rounded-md py-1 px-2 bg-red-400 hover:bg-red-500 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {showAddTask && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-120 relative">
            <button
              onClick={() => setShowAddTask(false)}
              className="absolute top-2 right-3
              cursor-pointer text-red-500 font-extrabold hover:text-red-600 text-xl"
            >
              ✕
            </button>
            <AddTaskForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
