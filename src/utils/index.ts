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

// const range = function* (to = 0, from = 0, step = 1) {
//   let i = 0,
//     length = Math.floor((to - from) / step) + 1;
//   while (i < length) yield from + i++ * step;
// };

const range = function* (start: number, stop: number | null, step = 1) {
  if (stop == null) {
    // one param defined
    stop = start;
    start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
};

export { sortPIClass, range };
