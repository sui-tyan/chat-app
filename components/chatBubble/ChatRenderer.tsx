import { MessageData } from '@/types/Chat';
import IncomingChatBubble from './IncomingChatBubble';
import OutgoingChatBubble from './OutgoingChatBubble';

export default function ChatRenderer({ message, messageType }: MessageData) {
  switch (messageType) {
    case 'incoming':
      return <IncomingChatBubble message={message} />;
    case 'outgoing':
      return <OutgoingChatBubble message={message} />;

    default:
      throw new TypeError(`${messageType} is not a valid type.`);
  }
}
