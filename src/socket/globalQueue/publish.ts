import { useRecoilState } from 'recoil';

import type { GlobalQueueMessage, GlobalQueueMessages } from './types';

import * as util from './utils';

import { WSSenderQueueBySocketURL } from './atom';

export default function usePublisherQueue({ WebSocket_URL }: { WebSocket_URL: string }) {
  // WS 보내는거 대기하는 큐
  const [_globalQueue, _setGlobalQueue] = useRecoilState(WSSenderQueueBySocketURL(WebSocket_URL));

  function enqueueMsgToSend<T>(globalQueueMSG: GlobalQueueMessage & T) {
    const NEW_GQM_ID = util.generateQueueMsgID();
    _setGlobalQueue(
      (globalQueueMSGs): GlobalQueueMessages => [
        ...globalQueueMSGs,
        {
          ...globalQueueMSG,
          GQM_ID: NEW_GQM_ID,
        },
      ],
    );

    return;
  }

  function clearSenderQueue() {
    _setGlobalQueue([]);
  }

  function _pop(): GlobalQueueMessage | undefined {
    const queueMsg = _globalQueue[0];
    _setGlobalQueue((globalQueueMSGs): GlobalQueueMessages => globalQueueMSGs.slice(1));
    return queueMsg;
  }

  function _pop_topic(topic: string): GlobalQueueMessage | undefined {
    const filterd_gqMsgs = _globalQueue.filter((gqMsg) => gqMsg.topic == topic);
    const qMSG = filterd_gqMsgs.length > 0 ? filterd_gqMsgs[0] : undefined;
    if (qMSG) {
      _setGlobalQueue(
        (globalQueueMSGs): GlobalQueueMessages =>
          globalQueueMSGs.filter((gqMsg) => gqMsg.GQM_ID != qMSG.GQM_ID).slice(1),
      );
    }
    return qMSG;
  }

  function popToSend(topic?: string): GlobalQueueMessage | undefined {
    if (_globalQueue.length > 0) {
      if (topic) return _pop_topic(topic);
      if (!topic) return _pop();
    }
    return undefined;
  }

  const lastestGQM = _globalQueue.length > 0 ? _globalQueue[0] : undefined;

  return {
    _globalQueue: _globalQueue,
    lastestGQM: lastestGQM,
    system: {
      enqueueMsg: enqueueMsgToSend,
      clearQueue: clearSenderQueue,
      consume: {
        pop: popToSend,
      },
    },
  };
}
