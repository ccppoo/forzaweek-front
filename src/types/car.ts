export type PerformanceTrait =
  | 'acceleration'
  | 'speed'
  | 'braking'
  | 'offroad'
  | 'launch'
  | 'handling';
export type SuspensionType = 'drift' | 'race' | 'rally';
export type TireType = 'normal' | 'snow' | 'rally' | 'offroad' | 'slick' | 'race' | 'drag';
export type DrivingSystemType = 'FWD' | 'AWD' | 'RWD';
export type EngineType = 'EV' | 'ICE' | 'HV';

export const performanceTraits: PerformanceTrait[] = [
  'acceleration',
  'speed',
  'braking',
  'offroad',
  'launch',
  'handling',
];

export type TuningOption =
  | 'Tires'
  | 'Gearing'
  | 'Alignment'
  | 'Antiroll Bars'
  | 'Springs'
  | 'Damping'
  | 'Aero'
  | 'Brake'
  | 'Diffrential';

export type TuningOptionName =
  | 'tires'
  | 'gearing'
  | 'alignment'
  | 'antirollBars'
  | 'springs'
  | 'damping'
  | 'aero'
  | 'brake'
  | 'diffrential';

export const TuningOptions: TuningOption[] = [
  'Tires',
  'Gearing',
  'Alignment',
  'Antiroll Bars',
  'Springs',
  'Damping',
  'Aero',
  'Brake',
  'Diffrential',
];

export const DrivingSystemTypes: DrivingSystemType[] = ['FWD', 'AWD', 'RWD'];
