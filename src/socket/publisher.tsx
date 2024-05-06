import React, { useEffect } from 'react';
import { selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

import { UseFullSocketAtom as ufsAtom, usePublisherQueue } from './globalQueue';
import type { PublishOption } from './types';

export const usePublisher = ({ url, topic }: PublishOption) => {
  const { system } = usePublisherQueue({ WebSocket_URL: url });

  function publishMessage(obj: any) {
    system.enqueueMsg({ topic: topic, ...obj });
  }

  return {
    publish: publishMessage,
  };
};
