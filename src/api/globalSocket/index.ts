import type { UseFullSocketConfig } from '@/socket/types';

import { SOCKET_HOST } from '../index';
import { receiveDBState, sendDBStateCheck } from './dbState';
import { pingSender, pongReceiver } from './ping';

/**
 * onOpen : 최초로 연결되었을 때 실행할 함수, 원래는 sendJsonMessage가 가능하지만, 나중에 binding을 통해서 사용할 수 있도록 할 예정
 * messageHandlers : 소켓에서 메세지 받고 다른 recoil이나 Queue로 넣어줘야함
 * messageSenders : socket으로 직접 보낼수 있으나, topic에 따라서 최종적으로 JSON형태로 포맷, 보내줄 함수
 */
export const mainSocketConfig: UseFullSocketConfig = {
  url: `${SOCKET_HOST}/ws`,
  onOpen: () => {
    console.log(`global socket connected`);
  },
  messageReceivers: {
    pong: pongReceiver,
    dbState: receiveDBState,
  },
  messageSenders: {
    ping: pingSender,
    dbStateCheck: sendDBStateCheck,
  },
  topicEnqueueMax: 10,
};
