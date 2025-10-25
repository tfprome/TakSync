import { Link } from "react-router-dom";

const Dashboard=()=>{
    return(
        <div className="h-screen w-full shadow-lg bg-blue-900">
            <div className="flex flex-col p-6 gap-4 font-bold text-white
                             border-b border-black">
                <Link to='/home/tasklist' className="">TaskList</Link>
                <Link to='/home/kanban'>Kanban Board</Link>
            </div>
        </div>
    )
};

export default Dashboard;