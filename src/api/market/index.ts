import axios from 'axios';

import type { API_NAME } from '@/api/types';
// import { dailyThemes } from './samples/dailyTheme';
// import type { DailyTheme } from './types';

type YYYY_MM_DD = string;

type DailyThemeID = string;

export async function getDailyTheme({
  queryKey,
}: {
  queryKey: [API_NAME, YYYY_MM_DD, DailyThemeID];
}) {
// }): Promise<DailyTheme> {
  const [_, yyyy_mm_dd, dailyThemeID] = queryKey;
  // console.log(`yyyy_mm_dd : ${yyyy_mm_dd} /  dailyThemeID : ${dailyThemeID}`);

  // console.log(`dailyThemes[yyyy_mm_dd] : ${JSON.stringify(dailyThemes)}`);
  // console.log(`dailyThemes[yyyy_mm_dd] : ${JSON.stringify(dailyThemes[yyyy_mm_dd])}`);
  // return dailyThemes[yyyy_mm_dd][dailyThemeID];
  // const [_, { date, segment, user }, token] = queryKey;

  // const _date = toYearMonthDay(date);
  // // console.log(`_dateasdasdasdss : ${_date}`);
  // const timeSegment = 'week';

  // const path_ = `/commits/stat`;
  // const params = `date=${_date}&segment=${segment}`;
  // const url = `${API_HOST}${path_}?${params}`;

  // const resp = await axios.get<JandiCommitDayOfWeekStatResponse>(url, { headers: { ...AuthHeaders(token) } });

  // return resp.data;

}
