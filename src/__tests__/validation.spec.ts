import { describe, it, expect } from 'vitest';
import { registerSchema, loginSchema, emailSchema } from '@/lib/validation';

describe('validation schemas', () => {
  it('emailSchema accepts valid emails and rejects invalid', () => {
    expect(() => emailSchema.parse({ email: 'user@example.com' })).not.toThrow();
    expect(() => emailSchema.parse({ email: 'not-an-email' })).toThrow();
  });

  it('registerSchema requires password length, format and required fields', () => {
    // valid data: meets min length (8), includes uppercase, lowercase and digit
    expect(() => registerSchema.parse({
      email: 'a@b.com',
      password: 'Abcdef12',
      confirmPassword: 'Abcdef12',
      nombre_completo: 'Test User',
      username: 'testuser',
      terms: true,
    })).not.toThrow();

    // invalid: too short and missing required fields should throw
    expect(() => registerSchema.parse({
      email: 'a@b.com',
      password: '123',
      confirmPassword: '123',
      nombre_completo: 'T',
      username: 't',
      terms: true,
    })).toThrow();
  });

  it('loginSchema requires password and email', () => {
    expect(() => loginSchema.parse({ email: 'u@e.com', password: '123456' })).not.toThrow();
    expect(() => loginSchema.parse({ email: 'u@e.com', password: '' })).toThrow();
  });
});
