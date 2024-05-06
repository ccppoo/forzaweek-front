import { useEffect, useState } from 'react';
import { selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

import { UseFullSocketAtom as ufsAtom, usePublisherQueue } from './globalQueue';
import type { GlobalQueueMessage, GlobalQueueMessages } from './globalQueue/types';
import type { PubSubOption } from './types';

export const usePubSub = (options: PubSubOption) => {
  const _recoilState = ufsAtom.WSReceiverQueueBySocketURL(options.url);
  const [_value, _set] = useRecoilState(_recoilState);
  const [latestMessage, setLatestMessage] = useState<GlobalQueueMessage | undefined>(undefined);

  function pop(discard: boolean = false): GlobalQueueMessage | undefined {
    const _msgs = [..._value[options.topic]];

    const _msg = _msgs.pop();
    _msg && discard && _set({ ..._value, [options.topic]: _msgs });
    return _msg;
  }

  function shift(discard: boolean = false): GlobalQueueMessage | undefined {
    const _msgs = [..._value[options.topic]];
    const _msg = _msgs.shift();
    _msg &&
      discard &&
      _set({
        ..._value,
        [options.topic]: _msgs,
      });
    return _msg;
  }

  const watch = _value[options.topic] ? [..._value[options.topic]] : [];

  const { system } = usePublisherQueue({ WebSocket_URL: options.url });

  function publishMessage(obj: any) {
    system.enqueueMsg({ topic: options.topic, ...obj });
  }

  useEffect(() => {
    const _lmsg = watch[0];
    if (_lmsg) setLatestMessage(pop());
  }, [_value, watch]);

  return {
    pop,
    shift,
    publish: publishMessage,
    latestMessage: latestMessage,
    all: _value[options.topic] || [],
  };
};
