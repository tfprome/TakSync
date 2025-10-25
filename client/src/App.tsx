import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Kanbanboard from "./components/Kanbanboard";
import TaskList from "./components/Tasklist";

const App = () => {
  return (
    <Provider store={store}>
     <div>
        <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

         <Routes>
           <Route path="/home" element={<Home/>}>
             <Route path="tasklist" element={<TaskList/>}></Route>
             <Route path="kanban" element={<Kanbanboard/>}></Route>
           </Route>

        <Route path="/" element={<LoginForm/>}></Route>
         <Route path="/signup" element={<SignupForm/>}></Route>
         </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
