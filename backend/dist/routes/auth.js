"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
exports.authRouter = (0, express_1.Router)();
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";
// Register
exports.authRouter.post("/register", (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"), (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, password } = req.body;
    try {
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email already in use" });
            return;
        }
        const password_hash = await bcrypt_1.default.hash(password, 10);
        const user = userRepository.create({ email, password_hash });
        await userRepository.save(user);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Login
exports.authRouter.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"), (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, password } = req.body;
    try {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
        user.refresh_token = refreshToken;
        await userRepository.save(user);
        res.json({ accessToken, refreshToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Refresh Token
exports.authRouter.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json({ error: "Refresh token is required" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        const user = await userRepository.findOneBy({ id: payload.id });
        if (!user || user.refresh_token !== refreshToken) {
            res.status(403).json({ error: "Invalid refresh token" });
            return;
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: "15m" });
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(403).json({ error: "Invalid or expired refresh token" });
    }
});
// Logout
exports.authRouter.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(400).json({ error: "Refresh token required" });
        return;
    }
    try {
        const user = await userRepository.findOneBy({ refresh_token: refreshToken });
        if (user) {
            user.refresh_token = ""; // invalidate
            await userRepository.save(user);
        }
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
