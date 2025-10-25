
import Navbar from "./navbar";
import Dashboard from "./Dashboard";
import Progression from "./progressbar";
import { Outlet } from "react-router-dom";


const Home=()=>{

    return(
        <div className="flex flex-col">
            <div>
               <Navbar />
            </div>
            <div className="flex w-full h-screen">
             <div className="w-1/5">
                 <Dashboard/>
             </div>
            <div className="w-3/5">
                <Outlet/>
            </div>
             <div className="w-1/5">
             <Progression/>
             </div>
          </div>
        </div>
        
            
    )
}

export default Home;