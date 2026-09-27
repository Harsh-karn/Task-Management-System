"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const auth_1 = require("./routes/auth");
const tasks_1 = require("./routes/tasks");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.authRouter);
app.use("/api/tasks", tasks_1.taskRouter);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
