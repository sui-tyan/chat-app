import { ChatBubbleProps } from '@/types/Chat';
import { Card, CardContent } from '../ui/card';

export default function OutgoingChatBubble({ message }: ChatBubbleProps) {
  return (
    <Card className="self-end w-fit max-w-[150px] lg:max-w-[300px] 2xl:max-w-[500px] bg-blue-300">
      <CardContent className="p-2 text-sm break-words">{message}</CardContent>
    </Card>
  );
}
