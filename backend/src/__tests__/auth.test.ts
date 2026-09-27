import jwt from 'jsonwebtoken';

describe('Authentication Utilities', () => {
  const JWT_SECRET = 'test_secret';
  
  it('should sign and verify a token correctly', () => {
    const payload = { userId: 123 };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    expect(typeof token).toBe('string');
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    expect(decoded.userId).toBe(123);
    expect(decoded.exp).toBeDefined();
  });

  it('should throw an error for invalid tokens', () => {
    const invalidToken = 'this.is.invalid';
    expect(() => {
      jwt.verify(invalidToken, JWT_SECRET);
    }).toThrow();
  });
});
