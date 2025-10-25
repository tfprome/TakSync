import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface Task{
   _id?:string;
   title:string;
   desc?:string;
   status:'to-do' | 'in progress' | 'completed'
}

interface TaskState {
    tasks: Task[];
    loading:boolean;
    error:null;
}

const initialState: TaskState ={
    tasks: [],
    loading:false,
    error:null
}

const GetauthHeader =()=>{
    const token=localStorage.getItem('token')
    return{
        headers:{Authorization:`Bearer ${token}`}
    }
}

export const addtask=createAsyncThunk('task/add',async(data:Task)=>{
    const res=await axios.post('https://taksync.onrender.com/addtask',data,GetauthHeader() )
    return res.data;
});

export const fetchtask=createAsyncThunk('task/fetch',async()=>{
    const res=await axios.get('https://taksync.onrender.com/readtask',GetauthHeader())
    return res.data;
});

export const updatetask=createAsyncThunk('task/update',async({id,data}:{id:string;data:Partial<Task>})=>{
    const res=await axios.put(`https://taksync.onrender.com/updatetask/${id}`,data,GetauthHeader())
    return res.data;
});

export const deletetask=createAsyncThunk('task/delete',async(id:string)=>{
    await axios.delete(`https://taksync.onrender.com/deletetask/${id}`,GetauthHeader())
    return id;
});

 const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder 
           .addCase(addtask.fulfilled,(state,action:PayloadAction<Task>)=>{
              state.tasks.push(action.payload);
           })
           .addCase(fetchtask.fulfilled,(state,action:PayloadAction<Task[]>)=>{
               state.tasks=action.payload
           })
           .addCase(updatetask.fulfilled,(state,action:PayloadAction<Task>)=>{
             const i=state.tasks.findIndex(t=>t._id===action.payload._id)
             if(i!==-1)state.tasks[i]=action.payload
           })
           .addCase(deletetask.fulfilled,(state,action:PayloadAction<string>)=>{
               state.tasks=state.tasks.filter(t=>t._id!==action.payload)
           })
    }

 })

 export default taskSlice.reducer;