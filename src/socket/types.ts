type AnyFunction<T, K> = (msg: T) => K;
type AnyPromise<T, K> = (msg: T) => Promise<K>;

export type AnyCallable<T, K> = AnyFunction<T, K> | AnyPromise<T, K>;

interface MessageTopic {
  topic?: string;
}

export type MessageWithTopic = Required<MessageTopic>;

type MessageToSend = object;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MessageToReceive = any;

type WSMessageProxy<T> = Record<string | 'default', T>;

type WebSocketEventMessage = WebSocketEventMap['message'];

export type WSMessageReceivers = WSMessageProxy<AnyCallable<MessageToReceive, void>>;
export type WSMessageReceiverHandlers = AnyFunction<WebSocketEventMessage, void>;

export type WSMessageSenders = WSMessageProxy<AnyCallable<MessageToSend, MessageWithTopic>>;
export type WSMessageSenderHandlers = AnyFunction<MessageWithTopic, void>;

type SocketOnOpen = (event: WebSocketEventMap['open']) => void;

interface PubSubOptionBase {
  url: string;
  topic: string;
}

export interface PublishOption extends PubSubOptionBase {}

export interface SubscribeOption extends PubSubOptionBase {}

export interface PubSubOption extends SubscribeOption {}

export interface UseFullSocketConfig {
  url: string;
  onOpen: SocketOnOpen;
  messageReceivers: WSMessageReceivers;
  messageSenders: WSMessageSenders;
  topicEnqueueMax: number;
}
