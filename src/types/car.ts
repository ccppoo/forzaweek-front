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
