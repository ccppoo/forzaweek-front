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
