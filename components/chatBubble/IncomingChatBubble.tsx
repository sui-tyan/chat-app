import { ChatBubbleProps } from '@/types/Chat';
import { Card, CardContent } from '../ui/card';

export default function IncomingChatBubble({ message }: ChatBubbleProps) {
  return (
    <Card className="w-fit max-w-[150px] lg:max-w-[300px] 2xl:max-w-[500px]">
      <CardContent className="p-2 text-sm break-words">{message}</CardContent>
    </Card>
  );
}
