import { create } from "zustand";
import axios from "axios";
import { teams as localTeams, users as localUsers, channels as localChannels, rooms as localRooms, initialMessages } from "../services/mockData";

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
  company?: string;
  address?: string;
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
  otherUser?: User;
};

interface ChatState {
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
    try {
      // 1. Fetch Users from DummyJSON (Mandatory Public API)
      const usersRes = await axios.get("https://dummyjson.com/users?limit=10");

      // 2. Fetch "Teams/Posts" from JSONPlaceholder to simulate dynamic list
      const teamsRes = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=2");

      // Map public API users to our internal User format
      const mappedPublicUsers: User[] = usersRes.data.users.map((u: any, index: number) => ({
        id: `u${u.id}`,
        name: `${u.firstName} ${u.lastName}`,
        teamId: index % 2 === 0 ? "team1" : "team2",
        status: index % 3 === 0 ? "online" : "offline",
        email: u.email,
        phone: u.phone,
        company: u.company?.name || "Favlogix",
        address: `${u.address?.address}, ${u.address?.city}`
      }));

      // Map posts to Teams
      const mappedTeams: Team[] = teamsRes.data.map((p: any, index: number) => ({
        id: `team${index + 1}`,
        name: p.title.split(' ')[0], // Use first word of title
        channelCount: Math.floor(Math.random() * 20) + 5
      }));

      // Combine with local mock logic for rooms
      const richerRooms = localRooms.map((room, index) => {
        const otherUser = mappedPublicUsers[index % mappedPublicUsers.length];
        return { ...room, otherUser } as Room;
      });

      set({
        teams: mappedTeams,
        users: mappedPublicUsers,
        channels: localChannels,
        rooms: richerRooms,
        isLoading: false
      });

      // Select first room automatically
      if (!get().activeRoomId && richerRooms.length > 0) {
        get().setActiveRoom(richerRooms[0].id);
      }
    } catch (error) {
      // Fallback
      set({
        teams: localTeams,
        users: localUsers as User[],
        channels: localChannels,
        rooms: localRooms as unknown as Room[],
        isLoading: false
      });
    }
  },

  fetchMessages: async (roomId) => {
    set({ isLoadingMessages: true });
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // 3. Fetch Messages (Comments) from JSONPlaceholder for selected room
      const postId = roomId.replace(/\D/g, '') || '1';
      const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

      const mappedMessages: Message[] = commentsRes.data.slice(0, 5).map((c: any) => ({
        id: c.id,
        roomId,
        senderId: Math.random() > 0.5 ? "currUser" : "c1",
        text: c.body,
        time: "10:00 AM",
        read: true
      }));

      set({ messages: mappedMessages, isLoadingMessages: false });
    } catch (error) {
      set({ messages: initialMessages[roomId] || [], isLoadingMessages: false });
    }
  },

  sendMessage: (text) => {
    const { activeRoomId } = get();
    if (!activeRoomId) return;

    const newMessage: Message = {
      id: Date.now(),
      roomId: activeRoomId,
      senderId: "currUser",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    set((state) => ({ messages: [...state.messages, newMessage] }));

    // Simulate auto-responder
    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now() + 1,
        roomId: activeRoomId,
        senderId: "c1",
        text: `I received your message: "${text}"`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      set((state) => ({ messages: [...state.messages, replyMessage] }));
    }, 1500);
  },

  setTyping: (roomId, isTyping) => {
    if (isTyping) {
      set((state) => ({ typingUsers: { ...state.typingUsers, [roomId]: "You" } }));
    } else {
      set((state) => {
        const newTyping = { ...state.typingUsers };
        delete newTyping[roomId];
        return { typingUsers: newTyping };
      });
    }
  }
}));
