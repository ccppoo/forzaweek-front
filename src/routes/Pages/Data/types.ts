import type { RoutesBase } from '@/routes/types';

enum DataPages {
  Data,
  DataList,
  DataEdit,
  DataWrite,
}

type RoutesData = RoutesBase<DataPages>;

export { DataPages };
export type { RoutesData };
