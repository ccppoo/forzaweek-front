import type { PIClass } from '@/types';

function sortPIClass(piClass1: PIClass | string, piClass2: PIClass | string) {
  const pi: Record<PIClass, number> = {
    D: 1,
    C: 2,
    B: 3,
    A: 4,
    S1: 5,
    S2: 6,
    X: 7,
  };
  return pi[piClass1 as PIClass] - pi[piClass2 as PIClass];
}

export { sortPIClass };
