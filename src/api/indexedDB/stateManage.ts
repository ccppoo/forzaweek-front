import axios from 'axios';

import { API_HOST } from '../index';

type getDB = {
  table: string;
};

type GetDBType<T> = {
  version: string; // string - 버전 이름
  lastUpdate: number; // timestamp
  data: T[];
};

export async function getDB(params: getDB) {
  const { table } = params;

  const path_ = `db/${params.table}`;
  const url = `${API_HOST}/${path_}`;
  // const { data } = await axios.get<GetDBType<Nation>>(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // const { version, lastUpdate, data: newTableData } = data;

  // await dbTableUpsert<Nation>({ table, ...data });
}
