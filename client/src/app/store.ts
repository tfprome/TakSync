import { configureStore } from "@reduxjs/toolkit";
import taskreducer from '../features/taskislice'

export const store=configureStore({
    reducer:{
        tasks:taskreducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;