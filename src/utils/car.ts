import type { PIClass } from '@/types';

export function get_pi_class(pi_number: number): string {
  if (pi_number <= 500) return 'D';
  if (pi_number > 500 && pi_number <= 600) return 'C';
  if (pi_number > 600 && pi_number <= 700) return 'B';
  if (pi_number > 700 && pi_number <= 800) return 'A';
  if (pi_number > 800 && pi_number <= 900) return 'S1';
  if (pi_number > 900 && pi_number <= 998) return 'S2';
  return 'X';
}

export function get_pi_color(pi_number: number): string {
  if (pi_number <= 500) return '#0cdbed';
  if (pi_number > 500 && pi_number <= 600) return '#ede405';
  if (pi_number > 600 && pi_number <= 700) return '#f2881d';
  if (pi_number > 700 && pi_number <= 800) return '#f03518';
  if (pi_number > 800 && pi_number <= 900) return '#b94fe3';
  if (pi_number > 900 && pi_number <= 998) return '#164ff7';
  return '#32e60e';
}

export function get_pi_color_by_class(piClass: PIClass): string {
  const piClassColor = {
    D: '#0cdbed',
    C: '#ede405',
    B: '#f2881d',
    A: '#f03518',
    S1: '#b94fe3',
    S2: '#164ff7',
    X: '#32e60e',
  };
  return piClassColor[piClass];
}
