import {SendJsonMessage} from 'react-use-websocket/src/lib/types'
import type {
  WSMessageSenders, WSMessageSenderHandlers, MessageWithTopic
} from '../types'

// 받아야 하는 값들은
// 사용자가 정의한 Topic에 대해서 websocket으로 어떤 데이터를 JSON을 보낼 것인지에 대한 것
export function WebSocketMessageSender( sendJsonMessage: SendJsonMessage, wsMsgSenders: WSMessageSenders) : WSMessageSenderHandlers {

  // 다른 컴포넌트로부터 websocket으로 보내달라는 요청을 쌓아 놓는 메세지(object)

  const _fn = (messageWithTopic:MessageWithTopic) => {
    const { topic, ...res } = messageWithTopic
    let result;
    try {
      const fn = wsMsgSenders[topic] || wsMsgSenders['default'];

      result = fn(res);

      if (result instanceof Promise) {
        result.then(res=>{sendJsonMessage(res)}).catch(err=>err);
        return;
      }
      sendJsonMessage(result)
    } catch (e) {
      e
    }
    return;
  };

  return _fn
}