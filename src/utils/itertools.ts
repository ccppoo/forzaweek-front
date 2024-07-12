export function* zip<T, K, G>(cars: T[], fh5: K[], images: G[]): Generator<[T, K, G]> {
  // Create an array of tuples
  const len = cars.length;
  let cnt = 0;
  while (cnt < len) {
    yield [cars[cnt], fh5[cnt], images[cnt]];
    cnt++;
  }
}
