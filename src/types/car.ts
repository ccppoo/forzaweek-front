import type { Car2 } from '@/db/schema';
import type { CarImageBase } from '@/db/schema/carImage';
import type { FH5_META_BASE, FH5_Performance_BASE } from '@/db/schema/fh5';
import type { Manufacturer } from '@/db/schema/manufacturer';
import type { Nation } from '@/db/schema/nation';

export type CarImages = {
  main: string;
  images: string[];
};

export interface CarInfo2 extends Omit<Car2, 'manufacturer' | 'nation'> {
  manufacturer: Manufacturer;
  nation: Nation;
  image: CarImageBase;
  fh5_meta: FH5_META_BASE;
  fh5_perf: FH5_Performance_BASE;
}

export interface CarAndImage extends Car2 {
  image: CarImageBase;
}

export interface CarInfoSimple extends Omit<Car2, 'manufacturer'> {
  manufacturer: Manufacturer;
}

export interface CarInfoEssential extends Omit<Car2, 'manufacturer'> {
  manufacturer: Manufacturer;
  image: CarImageBase;
}

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
