export function generateQueueMsgID(): string {
  return new Date().getTime().toString();
}