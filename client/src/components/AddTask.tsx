import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addtask } from "../features/taskislice";

const AddTaskForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return alert("Please enter a task title");

    dispatch(addtask({ title, desc, status: "to-do" }));
    setTitle("");
    setDesc("");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
      <h2 className="text-2xl font-semibold text-center mb-4">📝 Add Task</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
