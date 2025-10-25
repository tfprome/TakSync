import { configureStore } from "@reduxjs/toolkit";
import taskreducer from '../features/taskislice'
import authreducer from '../features/authslice'

export const store=configureStore({
    reducer:{
        tasks:taskreducer,
        auth:authreducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;