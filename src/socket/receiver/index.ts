import type {WSMessageReceiverHandlers, WSMessageReceivers} from '../types'

// 어차피 topic은 백엔드에서 잘 보내야하는 거고, 데이터를 처리할 프런트는 topic 데이터를 읽어올 필요가 없다.

export function WebSocketMessageReceiver(wsMsgHandlers: WSMessageReceivers) : WSMessageReceiverHandlers {
  return (event: WebSocketEventMap['message']) => {
    // 무조건 string으로 받으므로 알아서 parsing 해야함
    const { data : RawSocketStringData } = event
    try {
      // log(`msg.type : ${msg.type}`);
      const {topic, ...res} = JSON.parse(RawSocketStringData) ;
      const fn = wsMsgHandlers[topic] || wsMsgHandlers['default'];

      // NOTE: 여기서 서버에서 오는 값을 저장하는 queue를 따로 만들어서
      // 컴포넌트로 사용자한테 제공 -> recoil 안쓰는 사람은 따로 recoil 사용하지 않아도 될 정도로
      // 일단 값을 저장해서 Array로 반환하자
      const result = fn(res);
      if (result) {
        // result
        // console.log(`result : ${result}`);
        result
          .then(() => {
            1 + 1;
            // console.log(`시발 | msg.type : ${msg.type}`);
          })
          .catch((e) => {
            e;
            // console.log(`시발 에러| msg.type : ${msg.type}`);
          });
      }
    } catch (e) {
      1 + 1;
    }
    return;
  };
}