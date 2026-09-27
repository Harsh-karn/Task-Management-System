"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Authentication Utilities', () => {
    const JWT_SECRET = 'test_secret';
    it('should sign and verify a token correctly', () => {
        const payload = { userId: 123 };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        expect(typeof token).toBe('string');
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        expect(decoded.userId).toBe(123);
        expect(decoded.exp).toBeDefined();
    });
    it('should throw an error for invalid tokens', () => {
        const invalidToken = 'this.is.invalid';
        expect(() => {
            jsonwebtoken_1.default.verify(invalidToken, JWT_SECRET);
        }).toThrow();
    });
});
