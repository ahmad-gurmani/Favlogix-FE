import type { User } from "./user.types";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  roomId: string;
  timestamp: Date | string;
  type: "text" | "image" | "file" | "system";
  status: "sending" | "sent" | "delivered" | "read";
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    imageUrl?: string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: "direct" | "group";
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  isArchived?: boolean;
  isMuted?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface TypingIndicator {
  userId: string;
  roomId: string;
  isTyping: boolean;
}

export interface ReadReceipt {
  messageId: string;
  userId: string;
  readAt: Date;
}
