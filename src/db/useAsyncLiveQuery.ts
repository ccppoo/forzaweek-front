import { useLiveQuery } from 'dexie-react-hooks';

export enum Status {
  PENDING = 'pending',
  RESOLVED = 'resolved',
}

export type AsyncLiveQueryReturn<T = any> =
  | AsyncLiveQueryReturnPending
  | AsyncLiveQueryReturnResolved<T>;

export interface AsyncLiveQueryReturnPending {
  isLoading: true;
  isSuccess: false;
  status: Status.PENDING;
  data: null;
}

export interface AsyncLiveQueryReturnResolved<T = any> {
  isLoading: false;
  isSuccess: true;
  status: Status.RESOLVED;
  data: T extends Array<infer U> ? Array<U> : T | undefined;
}

interface useAsyncLiveQueryIntf<T> {
  queryFn: () => Promise<T>;
  queryKeys: any[];
  defaultIfMissing?: T;
  placeHolder?: T;
  enabled?: boolean;
}
// const useAsyncLiveQuery = <T>(
//   querier: () => Promise<T>,
//   deps: any[] = [],
//   defaultIfMissing?: T,
//   placeHolder?: T,
// ): AsyncLiveQueryReturn<T> => {
const useAsyncLiveQuery = <T>({
  queryFn,
  queryKeys,
  defaultIfMissing,
  placeHolder,
  enabled,
}: useAsyncLiveQueryIntf<T>): AsyncLiveQueryReturn<T> => {
  if (enabled === false) {
    return {
      isLoading: true,
      isSuccess: false,
      status: Status.PENDING,
      data: null,
    } as AsyncLiveQueryReturnPending;
  }
  const [data, status] = useLiveQuery(
    () => {
      return queryFn().then((data: T) => {
        const d = data === undefined ? defaultIfMissing : data;
        return [d, Status.RESOLVED];
      });
    },
    queryKeys,
    [placeHolder, Status.PENDING],
  );

  return {
    isLoading: status === Status.PENDING,
    isSuccess: status === Status.RESOLVED,
    status,
    data,
  } as AsyncLiveQueryReturn<T>;
};

export default useAsyncLiveQuery;
