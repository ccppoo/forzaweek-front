export function getPrecision(n: number) {
  let e = 1;
  let p = 0;
  while (Math.round(n * e) / e !== n) {
    e *= 10;
    p++;
  }
  return p;
}
