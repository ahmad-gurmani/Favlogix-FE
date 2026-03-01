import type { ChatRoom, Message } from "../types/chat.types";
import type { User } from "../types/user.types";

export const currentUser: User = {
  id: "1",
  username: "Michael Johnson",
  role: "agent",
  email: "",
  status: "online",
};

export const users: User[] = [
  {
    id: "2",
    username: "Olivia Mckinsey",
    role: "customer",
    email: "",
    status: "online",
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    roomId: "c1",
    sender: users[0],
    senderId: users[0].id,
    content: "Hi, I recently joined Fit4Life and I can't login.",
    type: "system",
    status: "sending",
    timestamp: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "m2",
    roomId: "c1",
    sender: currentUser,
    senderId: currentUser.id,
    content: "Hello Olivia 👋 Let’s fix this quickly.",
    type: "system",
    status: "sending",
    timestamp: "",
    createdAt: new Date().toISOString(),
  },
];

export const chats: ChatRoom[] = [
  {
    id: "c1",
    participants: [currentUser, users[0]],
    lastMessage: messages[messages.length - 1],
    unreadCount: 2,
    name: "",
    type: "direct",
  },
];
