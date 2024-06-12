'use client';
import {
  Bird,
  CornerDownLeft,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Share,
  Turtle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { MessageData } from '@/types/Chat';
import ChatRenderer from '@/components/chatBubble/ChatRenderer';
import { socket } from '@/lib/socket';
import { api } from '@/lib/api';

export default function Chats() {
  const [chatHistory, setChatHistory] = useState<MessageData[]>([
    {
      message:
        'I wish to mourn the departed, weeping like rain, to swell the crossing stream... as the tides arrives, leading you back home.',
      messageType: 'incoming',
    },
  ]);

  const [message, setMessage] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // TODO: Fix this later
  const onEnterPress = (e) => {
    e.preventDefault();

    if (message === '') return null;

    socket.emit('send-message', { message: message, socketId: chatId });

    setChatHistory((prev) => [
      ...prev,
      { message: e.target.value, messageType: 'outgoing' },
    ]);
    setMessage('');
  };

  useEffect(() => {
    socket.emit('user-connected', user);
    async function callConvo() {
      setTimeout(async () => {
        console.log(await api.get('/all-convo'));
      }, Number(1000));
    }
    callConvo();

    return () => {
      socket.off('user-connected');
    };
  }, [user]);

  useEffect(() => {
    socket.on('receive-message', (response) => {
      console.log(response);
      setChatHistory((prev) => [
        ...prev,
        { message: response, messageType: 'incoming' },
      ]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Settings className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{' '}
                              <span className="font-medium text-foreground">
                                Genesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{' '}
                              <span className="font-medium text-foreground">
                                Explorer
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{' '}
                              <span className="font-medium text-foreground">
                                Quantum
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input id="top-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input id="top-k" type="number" placeholder="0.0" />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="You are a..." />
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button>
      </header>
      <main className="grid flex-1 gap-4 h-screen overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <Input
            placeholder="name"
            onKeyDown={(e) => {
              e.code === 'Enter' && e.shiftKey == false
                ? setUser(e.target.value)
                : null;
            }}
          />
          <Input
            placeholder="chat id"
            onChange={(e) => setChatId(e.target.value)}
          />
          <CardContent className="grid gap-2 w-full px-0">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">John Smith</p>
                <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden">
                  You: 178.12.525.74
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Raiden Bosenmori Mei
                </p>
                <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden">
                  I weep for the departed
                </p>
              </div>
            </div>
            <Separator />
          </CardContent>
        </div>
        <div className="flex flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-auto ">
          <div className="grow overflow-y-auto h-[50vh]">
            {chatHistory.map(({ message, messageType }, index) => (
              <ChatRenderer
                key={index}
                message={message}
                messageType={messageType}
              />
            ))}
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring mt-4">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              value={message}
              onKeyDown={(e) =>
                e.code === 'Enter' && e.shiftKey == false
                  ? onEnterPress(e)
                  : null
              }
              onChange={handleMessageChange}
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
