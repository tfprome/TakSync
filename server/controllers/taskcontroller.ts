import { Request,Response } from "express";
import taskmodel from "../models/taskmodel";
import  mongoose  from 'mongoose';

export const addtask=async(req:Request,res:Response)=>{
    try{
        const newtask=await taskmodel.create(req.body)
        res.status(201).json(newtask)
    }
    catch(e:any){
        res.status(500).json({error:e})
    }
}

export const readtask=async(req:Request,res:Response)=>{
    try{
           const tasks=await taskmodel.find()
           res.status(201).json(tasks)
           console.log('tasks sent')
    }
    catch(e:any){
              res.status(500).json({error:e})
    }
}

export const updatetask=async(req:Request,res:Response)=>{
    try{
            const id=req.params.id;
            const task=await taskmodel.findByIdAndUpdate(id,req.body,{new:true})
            res.json(task)
    }
    catch(e:any){
              res.status(500).json({error:e})
    }
}


export const deletetask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Incoming ID:", id);

    // Convert string to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const objectId = new mongoose.Types.ObjectId(id);

    const found = await taskmodel.findById(objectId);
    console.log("Found before delete:", found);

    if (!found) {
      console.log("Could not find task");
      return res.status(404).json("could not find task");
    }

    await taskmodel.findByIdAndDelete(objectId);
    return res.status(200).json("task deleted");
  } catch (e: any) {
    console.error("Error in delete:", e);
    return res.status(500).json({ error: e });
  }
};
