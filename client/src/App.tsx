import { Provider } from "react-redux";
import { store } from "./app/store";
import AddTaskForm from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-10">Task Manager</h1>

        <div className="flex flex-row items-start justify-center gap-8 w-full  p-6">
          <div className="pt-7">
             <AddTaskForm/>
          </div>
          <TaskList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
