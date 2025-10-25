import mongoose,{Schema,Document} from "mongoose";

interface Task extends Document{
    title:string;
    desc?:string;
    status:'to-do' | 'in progress' | 'completed'
    userId:mongoose.Schema.Types.ObjectId
}

const TaskSchema=new Schema<Task>({
   title:{type:String,required:true},
   desc:{type:String},
   status:{type:String,required:true,default:'to-do'},
   userId:{type:Schema.Types.ObjectId, required:true}
})

const taskmodel= mongoose.model<Task>('Task',TaskSchema)
export default taskmodel;