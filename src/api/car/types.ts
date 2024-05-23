export type FH5_info = {
  division: string;
  PI: number;
};

export type CarInfo = {
  manufacture: string;
  year: number;
  country: string;
  name: string;
  drive_train: string;
  body_style: string;
  door: number;
  engine: string;
  FH5: FH5_info;
};

export type CarData = {
  image: string;
  info: CarInfo;
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
export type CountyType =
  | 'Australia'
  | 'Austria'
  | 'Canada'
  | 'China'
  | 'Croatia'
  | 'Denmark'
  | 'France'
  | 'Germany'
  | 'Italy'
  | 'Japan'
  | 'Korea'
  | 'Mexico'
  | 'Netherlands'
  | 'Spain'
  | 'Sweden'
  | 'UAE'
  | 'UK'
  | 'USA';
