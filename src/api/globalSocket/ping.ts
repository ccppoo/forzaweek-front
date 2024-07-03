type PongMSG = { pong: string };

const pingSender = (data: any) => {
  return { topic: 'ping', ...data };
};

const pongReceiver = (msg: PongMSG) => {
  msg;
};

export { pingSender, pongReceiver };
