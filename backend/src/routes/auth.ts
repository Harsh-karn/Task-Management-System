import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const authRouter = Router();
const userRepository = AppDataSource.getRepository(User);

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

// Register
authRouter.post(
  "/register",
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
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

      const password_hash = await bcrypt.hash(password, 10);
      const user = userRepository.create({ email, password_hash });
      await userRepository.save(user);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Login
authRouter.post(
  "/login",
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
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

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
         res.status(401).json({ error: "Invalid credentials" });
         return;
      }

      const accessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

      user.refresh_token = refreshToken;
      await userRepository.save(user);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Refresh Token
authRouter.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
     res.status(401).json({ error: "Refresh token is required" });
     return;
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const user = await userRepository.findOneBy({ id: payload.id });

    if (!user || user.refresh_token !== refreshToken) {
       res.status(403).json({ error: "Invalid refresh token" });
       return;
    }

    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// Logout
authRouter.post("/logout", async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
