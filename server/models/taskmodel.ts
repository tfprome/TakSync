import mongoose,{Schema,Document} from "mongoose";

interface Task extends Document{
    title:string;
    desc?:string;
    status:'to-do' | 'in progress' | 'completed'
}

const TaskSchema=new Schema<Task>({
   title:{type:String,required:true},
   desc:{type:String},
   status:{type:String,required:true,default:'to-do'}
})

const taskmodel= mongoose.model<Task>('Task',TaskSchema)
export default taskmodel;