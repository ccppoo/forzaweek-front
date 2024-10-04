import axios from 'axios';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { ContentTypeHeader } from '@/api/config';
import type { API_NAME } from '@/api/types';
import type { TuningBulkWriteType } from '@/schema/fh5/tuning/bulkWrite';

import { BASE_PATH_FH5_TUNING } from './config';

export async function UploadTuning({ tuning }: { tuning: TuningEditSchema }) {
  // console.log(`처리된 data : ${JSON.stringify(data)}`);
  const data = { ...tuning };
  const url = `${BASE_PATH_FH5_TUNING}`;

  const resp = await axios.post(url, data, {
    headers: {
      ...ContentTypeHeader.JSON,
    },
  });
}

export async function BulkUploadTuning({ tunings }: { tunings: TuningBulkWriteType }) {
  // const { id: docID } = tuning;

  // const data = {
  //   ...tuning,
  // };
  // console.log(`data : ${JSON.stringify(data)}`);
  const { tunings: tuningList } = tunings;
  const url = `${BASE_PATH_FH5_TUNING}/bulk`;
  const resp = await axios.post(url, tuningList, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}
