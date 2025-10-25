import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addtask } from "../features/taskislice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTaskForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate=useNavigate();

  const handleAdd = () => {
    if (!title.trim()) return toast.warning("Please enter a task title");

    dispatch(addtask({ title, desc, status: "to-do" }));
    setTitle("");
    setDesc("");
    toast.success("Task added successfully")
    navigate('/home/tasklist')
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Task</h2>
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
        className="bg-gradient-to-r from-purple-300 to-purple-600 cursor-pointer
          text-black py-2 rounded-lg w-full hover:from-purple-300 hover:to-blue-600 transition-all"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
