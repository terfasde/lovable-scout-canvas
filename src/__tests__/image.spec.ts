import { describe, it, expect } from 'vitest';
import { imageFileSchema } from '@/lib/validation';

describe('imageFileSchema', () => {
  it('accepts a valid image File', () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' });
    expect(() => imageFileSchema.parse(file)).not.toThrow();
  });

  it('rejects a non-image or too large file', () => {
    const file = new File(['data'], 'doc.txt', { type: 'text/plain' });
    expect(() => imageFileSchema.parse(file)).toThrow();
  });
});
