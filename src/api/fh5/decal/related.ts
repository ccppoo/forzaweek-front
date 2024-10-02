import axios from 'axios';

// import type { DecalEditSchema, DecalSchemaReadType, DecalSchemaType } from '@/FormData/decal';
import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type { DecalImageRead, DecalRead } from '@/schema/fh5/decal';

import { BASE_PATH, JSONContentType } from './config';

type DECAL_ID = string;

export async function GetRelatedDecals({
  queryKey,
}: {
  queryKey: [API_NAME, DECAL_ID];
}): Promise<DecalRead[]> {
  const [_, decalID] = queryKey;

  const url = `${BASE_PATH}/like/${decalID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function GetCarFH5Decals({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<DecalRead[]> {
  const [_, carFH5ID] = queryKey;

  const url = `${BASE_PATH}?carFH5=${carFH5ID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
