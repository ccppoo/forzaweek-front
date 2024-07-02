export interface DBState {
  id?: number;
  table: string; // 다른 테이블 이름
  version: string; // 테이블 버전, 서버 측에서 제공함
  lastUpdate: number; // 테이블 마지막 업데이트 timestamp
}
