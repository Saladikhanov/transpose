import { describe, expect, it } from 'vitest';
import { initials } from './Avatar.tsx';

describe('initials', () => {
  it('takes the first letter of the first two words', () => {
    expect(initials('ana maria lima')).toBe('AM');
  });

  it('handles one word and extra spaces', () => {
    expect(initials('  Rui  ')).toBe('R');
  });
});
