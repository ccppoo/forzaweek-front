import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';

import type { API_NAME } from '@/api/types';
import carInfo from '@/data/car_data.json';
import { db } from '@/db';
import { getCarData } from '@/db/index';
import type { CarImages, CarInfo, FH5_info } from '@/types/car';

import type { BodyStyleType, CarData, CountyType, DoorNumberType, DriveTrainType } from './types';

type YYYY_MM_DD = string;

type DailyThemeID = string;

interface GetCarsInterface {
  queryKey: [API_NAME];
  manufacture: string | undefined;
  year: number | undefined;
  country: CountyType | undefined;
  name: string | undefined;
  drive_train: DriveTrainType | undefined;
  body_style: BodyStyleType | undefined;
  door: DoorNumberType | undefined;
  engine: string | undefined;
}

export async function getCars({ queryKey }: { queryKey: [API_NAME] }): Promise<CarInfo[]> {
  const [_] = queryKey;

  // const cardata = useLiveQuery(getCarData, []);
  const cardata = await getCarData();
  // const timeSegment = 'week';
  // const path_ = `/commits/stat`;
  // const params = `date=${_date}&segment=${segment}`;
  // const url = `${API_HOST}${path_}?${params}`;
  // const resp = await axios.get<JandiCommitDayOfWeekStatResponse>(url, { headers: { ...AuthHeaders(token) } });
  // return resp.data;
  return cardata;
}
