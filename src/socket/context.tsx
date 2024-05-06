import React, { ReactNode, createContext, useEffect } from 'react';

import useWebSocket from 'react-use-websocket';

import { useSubscriberQueue, usePublisherQueue } from './globalQueue';
import { WebSocketMessageReceiver } from './receiver';
import { useGlobalWebSocketState } from './globalQueue';
import { WebSocketMessageSender } from './sender';
import type { UseFullSocketConfig } from './types';

export const StreamSocketContext = createContext<string>('');

export const UseFullWebSocketProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: UseFullSocketConfig;
}) => {
  // @ts-ignore ts(2783)
  const _config = { topicEnqueueMax: 30, ...config };
  const { url, onOpen, messageSenders, messageReceivers, topicEnqueueMax } = _config;

  const { system } = useSubscriberQueue({
    WebSocket_URL: url,
    topicEnqueueMax: topicEnqueueMax,
  });

  const {
    lastestGQM,
    _globalQueue,
    system: publisher,
  } = usePublisherQueue({
    WebSocket_URL: url,
  });

  const { setWebSocketState } = useGlobalWebSocketState({ WebSocket_URL: url });

  const { readyState, sendJsonMessage } = useWebSocket(url, {
    onOpen: onOpen,
    onMessage: (event: MessageEvent<any>) => {
      WebSocketMessageReceiver(messageReceivers)(event);
      const { data: RawSocketStringData } = event;
      const _msg = JSON.parse(RawSocketStringData);
      system.enqueueReceivedMsg(_msg);
    },
  });

  const webSocketMessageSender = WebSocketMessageSender(sendJsonMessage, messageSenders);

  useEffect(() => {
    if (_globalQueue.length < 1) return;
    const qMSG = publisher.consume.pop();
    if (qMSG) webSocketMessageSender(qMSG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastestGQM, _globalQueue.length, _globalQueue]);

  useEffect(() => {
    setWebSocketState(readyState);
  }, [readyState, setWebSocketState]);

  return <StreamSocketContext.Provider value="">{children}</StreamSocketContext.Provider>;
};
