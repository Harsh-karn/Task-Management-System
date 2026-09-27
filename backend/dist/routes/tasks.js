"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Task_1 = require("../entities/Task");
const auth_1 = require("../middleware/auth");
exports.taskRouter = (0, express_1.Router)();
const taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
exports.taskRouter.use(auth_1.authenticateJWT);
// Get all tasks for the logged in user
exports.taskRouter.get("/", async (req, res) => {
    try {
        const { search, status, due_date, category } = req.query;
        const whereCondition = { user_id: req.user?.id };
        if (status) {
            whereCondition.status = status;
        }
        if (due_date) {
            whereCondition.due_date = new Date(due_date);
        }
        if (category) {
            whereCondition.category = category;
        }
        if (search) {
            whereCondition.title = (0, typeorm_1.ILike)(`%${search}%`);
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9; // Default 9 tasks per page
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
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// Create a task
exports.taskRouter.post("/", (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// Update a task
exports.taskRouter.put("/:id", (0, express_validator_1.body)("title").optional().notEmpty(), (0, express_validator_1.body)("status").optional().isIn(["pending", "completed"]), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const id = parseInt(req.params.id);
    const { title, description, status, due_date, category } = req.body;
    try {
        const task = await taskRepository.findOneBy({ id, user_id: req.user?.id });
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        if (title !== undefined)
            task.title = title;
        if (description !== undefined)
            task.description = description;
        if (status !== undefined)
            task.status = status;
        if (due_date !== undefined)
            task.due_date = due_date;
        if (category !== undefined)
            task.category = category;
        await taskRepository.save(task);
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// Delete a task
exports.taskRouter.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const task = await taskRepository.findOneBy({ id, user_id: req.user?.id });
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        await taskRepository.remove(task);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
