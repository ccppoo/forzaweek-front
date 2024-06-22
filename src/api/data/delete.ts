import axios from 'axios';

import sleep from '@/utils/sleep';

import { API_HOST } from '../index';

export async function DeleteItem({
  dataType,
  documentID,
}: {
  dataType: string;
  documentID: string;
}) {
  const url = `${API_HOST}/${dataType}/${documentID}`;

  const resp = await axios.delete(url);

  return resp.data;
  // await sleep(1000);
  // return;
}
