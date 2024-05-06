import { RecoilValueReadOnly,  atomFamily, useRecoilState, RecoilState } from 'recoil';

import type { GlobalQueueMessage, GlobalQueueMessages, URL, URL_TOPIC, TopicMessageReceived } from './types';

import {ReadyState} from 'react-use-websocket';


export const WSSenderQueueBySocketURL = atomFamily<GlobalQueueMessages, URL>({
  key: 'ws-sender-queue-by-url',
  default: [],
});

// 1. 메세지 보낼거, 관리하는 atom 사용하기
const globalQueueSubscriber : (WebSocket_URL: string) =>RecoilState<GlobalQueueMessages> = (WebSocket_URL: string) =>
  WSSenderQueueBySocketURL(WebSocket_URL)

  export function subscribeGlobalQueue(topic: string): RecoilValueReadOnly<GlobalQueueMessages> {
    return globalQueueSubscriber(topic);
  }

  const globalSocketStateByURL = atomFamily<ReadyState, URL>({
    key: 'global-socket-state-by-url',
    default: ReadyState.UNINSTANTIATED,
  });

  export const WSReceiverQueueBySocketURL = atomFamily<TopicMessageReceived, URL_TOPIC>({
    key: 'ws-receiver-queue-by-url',
    default: {},
  });
