export const MESSAGE_SENDER = {
  USER: "user",
  MODEL: "model",
} as const;

export type MessageSender =
  (typeof MESSAGE_SENDER)[keyof typeof MESSAGE_SENDER];
