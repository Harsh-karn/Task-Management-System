"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_ACCESS_SECRET || "default_access_secret";
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err) {
                res.status(401).json({ error: "Unauthorized / Token expired" });
                return;
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json({ error: "Authorization header missing" });
    }
};
exports.authenticateJWT = authenticateJWT;
