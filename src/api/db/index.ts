import axios from 'axios';

import type { API_NAME } from '@/api/types';
import carInfo from '@/data/car_data.json';

export async function getCars({ queryKey }: { queryKey: [API_NAME] }) {
  // }): Promise<DailyTheme> {
  const [_] = queryKey;

  // const [_, { date, segment, user }, token] = queryKey;
  // const _date = toYearMonthDay(date);
  // // console.log(`_dateasdasdasdss : ${_date}`);
  // const timeSegment = 'week';
  // const path_ = `/commits/stat`;
  // const params = `date=${_date}&segment=${segment}`;
  // const url = `${API_HOST}${path_}?${params}`;
  // const resp = await axios.get<JandiCommitDayOfWeekStatResponse>(url, { headers: { ...AuthHeaders(token) } });
  // return resp.data;
  return carInfo;
}
