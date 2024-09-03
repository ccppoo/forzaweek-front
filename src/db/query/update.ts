import { db } from '@/db/index';
import { Country } from '@/db/model/real';

// export async function dbTableNeedsUpdate(table: string, version: string): Promise<boolean> {
//   const dbState = await db.dbState.where('table').equals(table).first();

//   if (dbState && dbState.version == version) {
//     return true;
//   }

//   return false;
// }

// // 현재 DB 테이블에 있는거 상태 반환
// export async function dbTableStates(): Promise<DBState[]> {
//   const dbState = await db.dbState.toArray();

//   return dbState;
// }

// // DB 테이블에 있는 상태 서버가 확인하고 저장할거 보내주는 것
// export async function dbTableUpsert<TableSchema>({
//   table,
//   version,
//   lastUpdate,
//   data,
// }: {
//   table: string;
//   version: string;
//   lastUpdate: number;
//   data: TableSchema[];
// }): Promise<void> {
//   const dbUpdated = await db.table(table).bulkPut(data);
//   const dbState = await db.dbState.where('table').equals(table).first();
//   // 기록이 없는 경우 추가
//   if (!dbState) {
//     db.dbState.put({ table: table, version: `${lastUpdate}`, lastUpdate: lastUpdate });
//     return;
//   }
//   await db.dbState.update(dbState.id, { lastUpdate: lastUpdate, version: `${lastUpdate}` });
// }

interface dbCollectionUpdateIntf<CollectionModel> {
  collection: string;
  version: string;
  lastUpdate: number;
  data: CollectionModel[];
}

export async function dbCollectionUpdate<CollectionModel>(
  params: dbCollectionUpdateIntf<CollectionModel>,
) {
  const { collection, data } = params;

  const dbUpdated = await db.table(collection).bulkPut(data);
  //   const dbState = await db.dbState.where('table').equals(table).first();
  //   // 기록이 없는 경우 추가
  //   if (!dbState) {
  //     db.dbState.put({ table: table, version: `${lastUpdate}`, lastUpdate: lastUpdate });
  //     return;
  //   }
  //   await db.dbState.update(dbState.id, { lastUpdate: lastUpdate, version: `${lastUpdate}` });
}
