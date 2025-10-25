import { Request, Response } from "express";
import taskmodel from "../models/taskmodel";
import mongoose from "mongoose";


export const addtask = async (req: Request, res: Response) => {
  try {
    const newtask = await taskmodel.create({
      ...req.body,
      userId: (req as any).user.id,
    });
    res.status(201).json(newtask);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const readtask = async (req: Request, res: Response) => {
  try {
    const tasks = await taskmodel.find({ userId: (req as any).user.id });
    res.status(200).json(tasks);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const updatetask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const task = await taskmodel.findOneAndUpdate(
      { _id: id, userId: (req as any).user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const deletetask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await taskmodel.findOneAndDelete({
      _id: id,
      userId: (req as any).user.id,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
