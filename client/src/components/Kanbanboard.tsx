import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { deletetask, fetchtask, updatetask } from "../features/taskislice";
import type { Task } from "../features/taskislice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTaskForm from "./AddTask";

const Kanbanboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [showAddTask,setShowAddTask]=useState(false)

  useEffect(() => {
    dispatch(fetchtask());
  }, [dispatch]);

  const startEdit = (task: Task) => {
    setEditId(String(task._id));
    setEditTitle(task.title);
    setEditDesc(task.desc || "");
  };

  const handleUpdate = () => {
    if (!editId) return;
    dispatch(updatetask({ id: editId, data: { title: editTitle, desc: editDesc } }));
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const handleDelete = (id: string) => {
    dispatch(deletetask(id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    dispatch(updatetask({ id: draggableId, data: { status: newStatus } }));
  };

  const statuses = ["Todo", "In Progress", "Done"];
  const groupedTasks: Record<string, Task[]> = { Todo: [], "In Progress": [], Done: [] };
  const statusColors: Record<string, string> = {
    "Todo": "bg-pink-100",
    "In Progress": "bg-yellow-100",
    "Done": "bg-green-300",
  };
  

  tasks.forEach((task) => {
    groupedTasks[task.status] ? groupedTasks[task.status].push(task) : groupedTasks["Todo"].push(task);
  });

  return (
    <div className="py-6 px-2 min-h-96 w-full">
        <div className="flex justify-between items-center mb-6">
       <h2 className="text-2xl font-bold ml-3 text-center">Kanban Board</h2>
        <button  onClick={()=>setShowAddTask(true)}
        className="bg-gradient-to-r from-purple-300 to-purple-600 cursor-pointer
          text-black p-2 rounded-lg w-1/6 hover:from-purple-300 hover:to-blue-600 transition-all">
          Add Task</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 justify-between w-full overflow-x-auto">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 w-full md:w-1/3 shadow-lg rounded-2xl p-4 flex flex-col ${statusColors[status]}`}

                >
                  <h3 className="text-xl font-semibold mb-3 text-center border-b pb-2">
                    {status}
                  </h3>

                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
                    {groupedTasks[status].map((task, index) => (
                      <Draggable
                        key={String(task._id)}
                        draggableId={String(task._id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                          >
                            {editId === String(task._id) ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <input
                                  value={editDesc}
                                  onChange={(e) => setEditDesc(e.target.value)}
                                  className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={handleUpdate}
                                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditId(null)}
                                    className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium text-gray-800">
                                  {task.title}
                                </p>
                                {task.desc && (
                                  <p className="text-sm text-gray-500">
                                    {task.desc}
                                  </p>
                                )}
                                <p className="text-xs text-gray-400">
                                  Status: {task.status}
                                </p>
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={() => startEdit(task)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDelete(String(task._id))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ❌
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div>
        {showAddTask &&(
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-120 relative">

            <button onClick={()=>setShowAddTask(false)}
              className="absolute top-2 right-3 text-red-500 
              cursor-pointer font-extrabold hover:text-red-600 hover:font-extrabold text-xl">
            ✕
            </button>
               <AddTaskForm/>
            </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Kanbanboard;
