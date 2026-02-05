import { describe, it, expect } from 'vitest';
import { canEditSeisena, canEditPatrulla, canEditPioneros, canEditRovers } from '@/types/profile';

describe('profile permission helpers', () => {
  it('canEditSeisena: true for 7-10, false otherwise', () => {
    expect(canEditSeisena(7)).toBe(true);
    expect(canEditSeisena(10)).toBe(true);
    expect(canEditSeisena(6)).toBe(false);
    expect(canEditSeisena(11)).toBe(false);
  });

  it('canEditPatrulla: true for 11-14, false otherwise', () => {
    expect(canEditPatrulla(11)).toBe(true);
    expect(canEditPatrulla(14)).toBe(true);
    expect(canEditPatrulla(10)).toBe(false);
    expect(canEditPatrulla(15)).toBe(false);
  });

  it('canEditPioneros: true for 15-17, false otherwise', () => {
    expect(canEditPioneros(15)).toBe(true);
    expect(canEditPioneros(17)).toBe(true);
    expect(canEditPioneros(14)).toBe(false);
    expect(canEditPioneros(18)).toBe(false);
  });

  it('canEditRovers: true for 18+', () => {
    expect(canEditRovers(18)).toBe(true);
    expect(canEditRovers(25)).toBe(true);
    expect(canEditRovers(17)).toBe(false);
  });
});
