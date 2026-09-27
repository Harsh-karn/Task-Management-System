import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Task } from "./entities/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(process.env.DATABASE_URL 
    ? {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_DATABASE || "task_management",
      }),
  synchronize: true, // Auto-create tables (dev only)
  logging: false,
  entities: [User, Task],
  migrations: [],
  subscribers: [],
});
