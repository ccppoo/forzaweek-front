import type {UseFullSocketConfig} from '@/socket/types'

const DEV_backend = 'wss://localhost:8443';

type PongMSG = { pong: string };

/**
 * onOpen : 최초로 연결되었을 때 실행할 함수, 원래는 sendJsonMessage가 가능하지만, 나중에 binding을 통해서 사용할 수 있도록 할 예정
 * messageHandlers : 소켓에서 메세지 받고 다른 recoil이나 Queue로 넣어줘야함
 * messageSenders : socket으로 직접 보낼수 있으나, topic에 따라서 최종적으로 JSON형태로 포맷, 보내줄 함수
 */
export const mainSocketConfig : (id : number) => UseFullSocketConfig =  (id : number) => {
  return {
  url: `${DEV_backend}/dev/${id}`,
  onOpen: () => {
    console.log(`global socket connected`);
  },
  messageReceivers: {
    pong :(msg: PongMSG) => {
            msg;
         }
  }, 
  messageSenders: {
    ping: (data : any) => {
      return { topic : 'ping', ...data };
    },
  },
  topicEnqueueMax : 10
};
} 

export const echoSocketConfig =   {
  url: `${DEV_backend}/echo`,
  onOpen: () => {
    console.log(`echo socket connected`);
  },
  messageReceivers: {
    pong :(msg: PongMSG) => {
            msg;
         }
  }, 
  messageSenders: {
    echo: (data : any) => {
      return { topic : 'echo', ...data };
    },
  },
  topicEnqueueMax : 1
};
