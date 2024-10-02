type DBState = {
  table: string; // db 테이블
  version: string; // db 테이블의 버전
  lastUpdate: number; // 마지막 업데이트, utc  timestamp
};

// 서버로부터 db state 확인하는 핸들러
const receiveDBState = (dbState: DBState) => {
  console.log(
    `receiveDBState | table : ${dbState.table}, version : ${
      dbState.version
    }, lastUpdate : ${new Date(dbState.lastUpdate)}`,
  );
};

// 서버한테 db state 확인 요청하는 핸들러
const sendDBStateCheck = (data: any) => {
  console.log(`sendDBStateCheck | data : ${JSON.stringify(data)}`);
  return { topic: 'dbStateCheck', ...data };
};

export { sendDBStateCheck, receiveDBState };
