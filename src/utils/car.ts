export function get_pi_class(pi_number: number): string {
  if (pi_number <= 500) return 'D';
  if (pi_number <= 600) return 'C';
  if (pi_number <= 700) return 'B';
  if (pi_number <= 800) return 'A';
  if (pi_number <= 900) return 'S1';
  if (pi_number <= 998) return 'S2';
  return 'X';
}

export function get_pi_color(pi_number: number): string {
  if (pi_number <= 500) return '#0cdbed';
  if (pi_number <= 600) return '#ede405';
  if (pi_number <= 700) return '#f2881d';
  if (pi_number <= 800) return '#f03518';
  if (pi_number <= 900) return '#b94fe3';
  if (pi_number <= 998) return '#164ff7';
  return '#32e60e';
}
