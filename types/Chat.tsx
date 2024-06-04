export type ChatBubbleProps = {
  message: String;
};

export type MessageData = {
  message: String;
  messageType: 'incoming' | 'outgoing';
};
