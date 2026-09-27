"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Task_1 = require("./entities/Task");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "task_management",
    synchronize: true, // Auto-create tables (dev only)
    logging: false,
    entities: [User_1.User, Task_1.Task],
    migrations: [],
    subscribers: [],
});
