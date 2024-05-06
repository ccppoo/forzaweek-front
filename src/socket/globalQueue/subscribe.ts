import {  useRecoilState } from 'recoil';

import type { GlobalQueueMessage, TopicMessageReceived } from './types';
import * as util from './utils'

import {WSReceiverQueueBySocketURL} from './atom'

export default function useSubscriberQueue({WebSocket_URL, topicEnqueueMax } : {WebSocket_URL : string, topicEnqueueMax : number}) {

  const [_receiverQueue, _setReceiverQueue] =  useRecoilState(WSReceiverQueueBySocketURL(WebSocket_URL));

  // WS 메세지 보낼거 enqueue 하기
  function enqueueReceivedMsg(globalQueueMSG: GlobalQueueMessage ) {
    // console.log(`msg : ${JSON.stringify(globalQueueMSG)}`)
    const {topic : _topic } = globalQueueMSG
    const NEW_GQM_ID = util.generateQueueMsgID();
    
    _setReceiverQueue(
      (_receiverQueue: TopicMessageReceived) => {
        let newQueue
        if(_receiverQueue[_topic]){
          const _queue = [..._receiverQueue[_topic]]
          if(_queue.length >= topicEnqueueMax) {_queue.shift()}
          newQueue = [..._queue].concat({
            ...globalQueueMSG,
            GQM_ID: NEW_GQM_ID,
          })
        }
        else{
          newQueue = [
            {
              ...globalQueueMSG,
              GQM_ID: NEW_GQM_ID,
            }
          ]
        }
        // console.log(`newQueue : ${JSON.stringify(newQueue)}`)
          return {
            ..._receiverQueue,
            [_topic] : newQueue
          }
      }
    );
    return
  }

  return {
    system: {
      enqueueReceivedMsg
    },
    subscribe : {
      toTopic : (topic : string) => _receiverQueue[topic],
    }, 
  };
}