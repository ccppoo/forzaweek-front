import {   atomFamily, useRecoilState} from 'recoil';

import type { URL } from './types';

import {ReadyState} from 'react-use-websocket';

import usePublisherQueue from './publish'
import useSubscriberQueue from './subscribe';

import * as UseFullSocketAtom from './atom'

export {
  usePublisherQueue,
  useSubscriberQueue,
  UseFullSocketAtom
}

const globalSocketStateByURL = atomFamily<ReadyState, URL>({
  key: 'global-socket-state-by-url',
  default: ReadyState.UNINSTANTIATED,
});

export function useGlobalWebSocketState({WebSocket_URL} : {WebSocket_URL : string}) {
  const [_globalWebSocketState, _setGlobalWebSocketState] = useRecoilState(globalSocketStateByURL(WebSocket_URL));

  return {
    setWebSocketState : (readyState : ReadyState)=>_setGlobalWebSocketState(readyState),
    socketState : _globalWebSocketState,
  }
}
