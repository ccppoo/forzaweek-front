import axios from 'axios';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';

export async function AddNewTuning({ tuning }: { tuning: TuningEditSchema }) {
  // console.log(`처리된 data : ${JSON.stringify(data)}`);
  const data = { ...tuning };
  const path_ = `tuning`;
  const url = `${API_HOST}/fh5/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function EditTuning({ tuning }: { tuning: TuningEditSchema }) {
  const { id: docID } = tuning;

  const data = {
    ...tuning,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `tuning/edit/${docID}`;
  const url = `${API_HOST}/fh5/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

// TODO: pagination
// TODO: 데칼 -> 차, 태그 query param에 따라 검색
export async function GetAllTuning({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<TuningSchemaType[]> {
  const [_] = queryKey;

  const path_ = `tuning`;

  const url = `${API_HOST}/fh5/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
