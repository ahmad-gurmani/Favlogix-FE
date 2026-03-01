import { create } from "zustand";
import axios from "axios";
import { io, Socket } from "socket.io-client";

export type Message = {
  id: number;
  roomId: string;
  senderId: string;
  text: string;
  time: string;
  read: boolean;
};

export type Team = {
  id: string;
  name: string;
  channelCount: number;
};

export type User = {
  id: string;
  name: string;
  teamId: string;
  status: "online" | "offline";
  email: string;
  phone: string;
};

export type Channel = {
  id: string;
  name: string;
  type: string;
  teamId: string;
};

export type Room = {
  id: string;
  type: string;
  participants: string[];
  lastMessageText: string;
  lastMessageTime: string;
  unreadCount: number;
  agentId?: string;
  otherUser?: User; // joined from backend
};

interface ChatState {
  socket: Socket | null;
  isChatOpen: boolean;
  isSidebarOpen: boolean;
  isDetailsCollapsed: boolean;
  activeRoomId: string | null;
  selectedUserId: string | null;

  // Data
  messages: Message[];
  teams: Team[];
  users: User[];
  channels: Channel[];
  rooms: Room[];
  typingUsers: Record<string, string>; // roomId -> userName

  isLoading: boolean;
  isLoadingMessages: boolean;

  // Actions
  initSocket: () => void;
  toggleChat: () => void;
  closeChat: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleDetails: () => void;
  setActiveRoom: (roomId: string) => void;
  setSelectedUser: (userId: string | null) => void;
  sendMessage: (text: string) => void;
  fetchAllData: () => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  setTyping: (roomId: string, isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  socket: null,
  isChatOpen: true,
  isSidebarOpen: true,
  isDetailsCollapsed: false,
  activeRoomId: null,
  selectedUserId: null,

  messages: [],
  teams: [],
  users: [],
  channels: [],
  rooms: [],
  typingUsers: {},

  isLoading: false,
  isLoadingMessages: false,

  initSocket: () => {
    if (get().socket) return; // Already initialized

    const socketUrl = "http://localhost:3001";
    const newSocket = io(socketUrl);

    newSocket.on("connect", () => {
      // Socket connected
    });

    newSocket.on("receive_message", (message: Message) => {
      // If the message belongs to the currently active room, append it to the chat
      if (message.roomId === get().activeRoomId) {
        set((state) => ({ messages: [...state.messages, message] }));
      }
      // Also update the room's last message info
      set((state) => ({
        rooms: state.rooms.map(r => r.id === message.roomId ? {
          ...r,
          lastMessageText: message.text.substring(0, 30) + (message.text.length > 30 ? '...' : ''),
          lastMessageTime: message.time,
          unreadCount: message.senderId !== "currUser" && message.roomId !== get().activeRoomId ? r.unreadCount + 1 : r.unreadCount
        } : r)
      }));
    });

    newSocket.on("user_typing", (data: { roomId: string, isTyping: boolean, user: string }) => {
      set((state) => {
        const newTyping = { ...state.typingUsers };
        if (data.isTyping) {
          newTyping[data.roomId] = data.user;
        } else {
          delete newTyping[data.roomId];
        }
        return { typingUsers: newTyping };
      });
    });

    set({ socket: newSocket });
  },

  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  closeChat: () => set({ isChatOpen: false }),

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  toggleDetails: () =>
    set((state) => ({ isDetailsCollapsed: !state.isDetailsCollapsed })),

  setActiveRoom: (roomId) => {
    set({ activeRoomId: roomId, isChatOpen: true });

    // Clear unread count locally when opened
    set((state) => ({
      rooms: state.rooms.map(r => r.id === roomId ? { ...r, unreadCount: 0 } : r)
    }));

    // Fetch historical messages for this room
    get().fetchMessages(roomId);

    // Tell socket we officially joined this view (optional based on backend logic)
    get().socket?.emit("join_room", roomId);
  },

  setSelectedUser: (userId) => {
    set({ selectedUserId: userId });
    const { rooms, setActiveRoom } = get();
    const filteredRooms = userId ? rooms.filter(r => r.agentId === userId) : rooms;

    if (filteredRooms.length > 0) {
      setActiveRoom(filteredRooms[0].id);
    } else {
      set({ activeRoomId: null, isChatOpen: false });
    }
  },

  fetchAllData: async () => {
    set({ isLoading: true });
    // Add artificial delay to show skeletons
    await new Promise(resolve => setTimeout(resolve, 2000));
    get().initSocket(); // Ensure socket is ready
    try {
      const [teamsRes, usersRes, channelsRes, roomsRes] = await Promise.all([
        axios.get("http://localhost:3001/api/teams"),
        axios.get("https://dummyjson.com/users?limit=5"), // Integration of LIVE Public API as per mandatory requirement
        axios.get("http://localhost:3001/api/channels"),
        axios.get("http://localhost:3001/api/rooms")
      ]);

      // Map public API users to our internal User format
      const mappedUsers: User[] = usersRes.data.users.map((u: any, index: number) => ({
        id: `u${index + 1}`,
        name: `${u.firstName} ${u.lastName}`,
        teamId: index % 2 === 0 ? "team1" : "team2",
        status: index % 2 === 0 ? "online" : "offline",
        email: u.email,
        phone: u.phone
      }));

      set({
        teams: teamsRes.data,
        users: mappedUsers,
        channels: channelsRes.data,
        rooms: roomsRes.data,
        isLoading: false
      });

      // Select first room automatically if none selected
      if (!get().activeRoomId && roomsRes.data.length > 0) {
        get().setActiveRoom(roomsRes.data[0].id);
      }
    } catch (error) {
      // Failed to fetch initial data
      set({ isLoading: false });
    }
  },

  fetchMessages: async (roomId) => {
    set({ isLoadingMessages: true });
    // Add artificial delay to show skeletons
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      const response = await axios.get(`http://localhost:3001/api/messages/${roomId}`);
      set({ messages: response.data, isLoadingMessages: false });
    } catch (error) {
      // Failed to fetch messages
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: (text) => {
    const { socket, activeRoomId } = get();
    if (!socket || !activeRoomId) return;

    socket.emit("send_message", {
      roomId: activeRoomId,
      text,
      senderId: "currUser"
    });
  },

  setTyping: (roomId, isTyping) => {
    const { socket } = get();
    if (!socket) return;
    socket.emit("typing", { roomId, isTyping, user: "You" });
  }
}));
