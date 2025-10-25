import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface User{
    id?:string;
    name:string;
    email?:string
    password?:string
}

interface AuthState{
    user:User|null;
    token:string|null;
    loading:boolean;
    error:string|null
}

const initialState:AuthState={
    user:localStorage.getItem('user')?{name:localStorage.getItem('user')!}:null,
    token:localStorage.getItem('token'),
    loading:false,
    error:null,
}

export const signupUser=createAsyncThunk("auth/signup", async (data:{name:string,email:string,password:string})=>
        { const res=await axios.post('https://taksync.onrender.com/auth/signup',data)
            return res.data;}
)

export const loginUser=createAsyncThunk("auth/login",async(data:{email:string,password:string})=>{
     const res=await axios.post('https://taksync.onrender.com/auth/login',data)
     return res.data
})

const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
              state.user=null;
              state.token=null;
              localStorage.removeItem('token');
              localStorage.removeItem('user')
        }
    },
    extraReducers:(builder)=>{
        builder
          .addCase(signupUser.pending,(state)=>{
              state.loading=true
          })
          .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
          })
          .addCase(signupUser.rejected,(state)=>{
            state.loading=false
            state.error="Signup Failed"
          })

          .addCase(loginUser.pending,(state)=>{
             state.loading=true;
          })
          .addCase(loginUser.fulfilled,(state,action)=>{
             state.loading=false
             state.user=action.payload.user
             state.token=action.payload.token
             localStorage.setItem("token",action.payload.token)  
             localStorage.setItem("user", action.payload.user.name);
                  
            })
          .addCase(loginUser.rejected,(state)=>{
            state.loading=false
            state.error="Login Failed"
          })
    }
})


export default authslice.reducer
export const {logout}=authslice.actions