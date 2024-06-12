import { MessageData } from '@/types/Chat';
import IncomingChatBubble from './IncomingChatBubble';
import OutgoingChatBubble from './OutgoingChatBubble';

export default function ChatRenderer({ message, messageType }: MessageData) {
  return (
    <>
      {messageType === 'outgoing' ? (
        <OutgoingChatBubble message={message} />
      ) : (
        <IncomingChatBubble message={message} />
      )}
    </>
  );
}
