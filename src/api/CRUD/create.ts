import axios from 'axios';
import { AxiosResponse, HttpStatusCode } from 'axios';

import { API_HOST, ContentTypeHeader } from '@/api';
import type { GAME } from '@/types';

interface CreateContentIntf<T> {
  path: string;
  data: T;
  gameScope?: GAME;
  expected?: HttpStatusCode | number;
}
export async function CreateContent<T, R>(props: CreateContentIntf<T>): Promise<AxiosResponse<R>> {
  const { path, data, gameScope, expected } = props;
  const expectedStatusCode = expected || 200;
  const END_POINT = gameScope ? `${API_HOST}/${gameScope}/${path}` : `${API_HOST}/${path}`;
  const resp = await axios.post<R>(END_POINT, data, {
    headers: ContentTypeHeader.JSON,
  });

  if (resp.status != expectedStatusCode) {
    // Handle data post processing
  }

  return resp;
}
