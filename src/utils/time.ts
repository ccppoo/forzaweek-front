export function utc_now() {
  /**
   * return UTC timestamp as seconds
   *
   */
  return Math.floor(Date.now() / 1000);
}
