import axios from 'axios';

import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

export async function GetSchemaForEdit({
  queryKey,
}: {
  queryKey: [API_NAME, { dataType: string; itemID: string }];
}) {
  const [_, { itemID, dataType }] = queryKey;

  const path_ = `${dataType}/edit/${itemID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url);

  return resp.data;
}
