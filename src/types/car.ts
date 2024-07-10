import type { Car2 } from '@/db/schema';
import type { CarImageBase } from '@/db/schema/carImage';
import type { FH5_META_BASE, FH5_Performance_BASE } from '@/db/schema/fh5';
import type { Manufacturer } from '@/db/schema/manufacturer';
import type { Nation } from '@/db/schema/nation';

export type FH5_info = {
  division: string;
  PI: number;
};

export type CarImages = {
  main: string;
  images: string[];
};

export type CarInfo = {
  id: number;
  name: string;
  year: number;
  country: string;
  driveTrain: string;
  door: number;
  engine: string;
  manufacture: string;
  bodyStyle: string;
  fh5: FH5_info;
  image: CarImages;
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

export type SuspensionType = 'drift' | 'race' | 'rally';
export type TierType = 'normal' | 'snow' | 'rally' | 'offroad' | 'slick' | 'race' | 'drag';
export type DrivingSystemType = 'FWD' | 'AWD' | 'RWD';

export type DriveTrainType = 'AWD' | 'FWD' | 'RWD';
export type DoorNumberType = 1 | 2 | 3 | 4;
export type BodyStyleType =
  | 'sedan'
  | 'hatchBack'
  | 'coupe'
  | 'wagon'
  | 'ATV'
  | 'limo'
  | 'threeWheeler'
  | 'convertible';
