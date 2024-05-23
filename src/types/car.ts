export type FH5_info = {
  division: string;
  PI: number;
};

export type CarImages = {
  main: string;
  images: string[];
};

export type CarInfo = {
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
