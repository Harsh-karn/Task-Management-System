import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import { ILike, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { authenticateJWT, AuthRequest } from "../middleware/auth";

export const taskRouter = Router();
const taskRepository = AppDataSource.getRepository(Task);

taskRouter.use(authenticateJWT);

// Get all tasks for the logged in user
taskRouter.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, due_date, category } = req.query;
    
    const whereCondition: FindOptionsWhere<Task> = { user_id: req.user?.id };

    if (status) {
      whereCondition.status = status as string;
    }
    if (due_date) {
      whereCondition.due_date = new Date(due_date as string);
    }
    if (category) {
      whereCondition.category = category as string;
    }
    if (search) {
      whereCondition.title = ILike(`%${search}%`);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9; // Default 9 tasks per page
    const skip = (page - 1) * limit;

    const [tasks, total] = await taskRepository.findAndCount({
      where: whereCondition,
      order: { created_at: "DESC" },
      take: limit,
      skip: skip,
    });

    res.json({
      data: tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a task
taskRouter.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const { title, description, due_date, category } = req.body;

    try {
      const task = taskRepository.create({
        title,
        description,
        due_date,
        category,
        user_id: req.user?.id,
        status: "pending",
      });
      await taskRepository.save(task);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update a task
taskRouter.put(
  "/:id",
  body("title").optional().notEmpty(),
  body("status").optional().isIn(["pending", "completed"]),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const id = parseInt(req.params.id as string);
    const { title, description, status, due_date, category } = req.body;

    try {
      const task = await taskRepository.findOneBy({ id, user_id: req.user?.id });
      if (!task) {
         res.status(404).json({ error: "Task not found" });
         return;
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (due_date !== undefined) task.due_date = due_date;
      if (category !== undefined) task.category = category;

      await taskRepository.save(task);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a task
taskRouter.delete("/:id", async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id as string);
  try {
    const task = await taskRepository.findOneBy({ id, user_id: req.user?.id });
    if (!task) {
       res.status(404).json({ error: "Task not found" });
       return;
    }
    await taskRepository.remove(task);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
