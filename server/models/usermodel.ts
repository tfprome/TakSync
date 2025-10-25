import mongoose, {Schema,Document} from "mongoose";

interface user extends Document{
    name:string;
    email:string;
    password:string
}

const userschema=new Schema<user>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const usermodel=mongoose.model<user>('User',userschema)
export default usermodel;
