import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { deletetask, fetchtask, updatetask } from "../features/taskislice";
import type { Task } from "../features/taskislice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

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

  tasks.forEach((task) => {
    groupedTasks[task.status] ? groupedTasks[task.status].push(task) : groupedTasks["Todo"].push(task);
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* 3 columns inside one flex container */}
        <div className="flex flex-col md:flex-row gap-6 justify-center overflow-x-auto">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 min-w-[300px] bg-white shadow-lg rounded-2xl p-4 flex flex-col ${
                    status === "Todo"
                      ? "bg-red-50"
                      : status === "In Progress"
                      ? "bg-yellow-50"
                      : "bg-green-50"
                  }`}
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
    </div>
  );
};

export default TaskList;
