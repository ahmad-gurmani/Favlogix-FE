
export const teams = [
  { id: "team1", name: "Sales", channelCount: 7 },
  { id: "team2", name: "Customer Support", channelCount: 16 }
];

export const users = [
  { id: "u1", name: "Sarah Williams", teamId: "team2", status: "online", email: "sarah.williams@gmail.com", phone: "+1 (301) 555-0135" },
  { id: "u2", name: "Michael Johnson", teamId: "team1", status: "offline", email: "michael.j@gmail.com", phone: "+1 (302) 555-0136" },
  { id: "u3", name: "Olivia Mckinsey", teamId: "team1", status: "online", email: "olivia.mckinsey@gmail.com", phone: "+1 (303) 555-0134" },
  { id: "u4", name: "Ethan Hunt", teamId: "team1", status: "online", email: "ethan.hunt@gmail.com", phone: "+1 (304) 555-0137" },
  { id: "u5", name: "Sophia Miller", teamId: "team2", status: "online", email: "sophia.m@gmail.com", phone: "+1 (305) 555-0138" }
];

export const clients = [
  { id: "c1", name: "Alex Carter", email: "alex.c@example.com", phone: "+1 555-1001", status: "offline" },
  { id: "c2", name: "Brian Smith", email: "brian.s@example.com", phone: "+1 555-1002", status: "online" },
  { id: "c3", name: "Chloe Davis", email: "chloe.d@example.com", phone: "+1 555-1003", status: "offline" },
  { id: "c4", name: "Diana Prince", email: "diana.p@example.com", phone: "+1 555-1004", status: "online" },
  { id: "c5", name: "Edward Norton", email: "edward.n@example.com", phone: "+1 555-1005", status: "online" },
  { id: "c6", name: "Fiona Gallagher", email: "fiona.g@example.com", phone: "+1 555-1006", status: "offline" },
];

export const channels = [
  { id: "ch1", name: "Fit4Life", type: "whatsapp", teamId: "team1" },
  { id: "ch2", name: "Fit4Life", type: "instagram", teamId: "team2" },
  { id: "ch3", name: "TechSupport", type: "whatsapp", teamId: "team2" }
];

export const rooms = [
  { id: "room1", type: "direct", agentId: "u2", clientId: "c1", lastMessageText: "I'll try it ASAP, thank..", lastMessageTime: "23:23", unreadCount: 0, participants: [] },
  { id: "room2", type: "direct", agentId: "u2", clientId: "c2", lastMessageText: "Are we still on for...", lastMessageTime: "23:16", unreadCount: 1, participants: [] },
  { id: "room3", type: "direct", agentId: "u1", clientId: "c3", lastMessageText: "Can you help me with my account?", lastMessageTime: "22:28", unreadCount: 2, participants: [] },
  { id: "room4", type: "direct", agentId: "u1", clientId: "c4", lastMessageText: "Perfect, everything works now. Thanks!", lastMessageTime: "14:10", unreadCount: 0, participants: [] },
  { id: "room5", type: "direct", agentId: "u3", clientId: "c1", lastMessageText: "Can we schedule a call for tomorrow?", lastMessageTime: "09:00", unreadCount: 0, participants: [] },
  { id: "room6", type: "direct", agentId: "u4", clientId: "c5", lastMessageText: "Looking forward to it!", lastMessageTime: "10:30", unreadCount: 0, participants: [] },
  { id: "room7", type: "direct", agentId: "u5", clientId: "c6", lastMessageText: "I have a question about the invoice.", lastMessageTime: "11:45", unreadCount: 1, participants: [] },
];

export const initialMessages: Record<string, any[]> = {
  "room1": [
    { id: 1, roomId: "room1", senderId: "c1", text: "Hi, I recently joined Fit4Life and I’m trying to access my workout plan, but I can’t login.\nCan you help?", time: "23:08", read: true },
    { id: 2, roomId: "room1", senderId: "u2", text: "Hello Alex 👋 I’m Michael, your customer support assistant. Let’s fix this quickly.\nCould you confirm the email address?", time: "23:08", read: true },
    { id: 3, roomId: "room1", senderId: "c1", text: "Yes, it’s alex.c@example.com", time: "23:16", read: true },
    { id: 4, roomId: "room1", senderId: "u2", text: "Thanks! Looks like your reset wasn’t completed. I’ve sent a new link – please check your inbox.", time: "23:16", read: true },
    { id: 5, roomId: "room1", senderId: "c1", text: "I see it. resetting now…", time: "23:17", read: true },
    { id: 6, roomId: "room1", senderId: "c1", text: "Done! I’m logged in. Thanks!", time: "23:20", read: true },
    { id: 7, roomId: "room1", senderId: "u2", text: "Perfect 🎉 Your plan is ready under “My Programs”. Since you’re starting out, I suggest our Premium Guide – it boosts results and is 20% off here 👉\nwww.Fit4Life.com/Premium", time: "23:20", read: true },
    { id: 8, roomId: "room1", senderId: "c1", text: "Oh my god 😍 I’ll try it ASAP, thank you so much!!", time: "23:23", read: true },
  ],
  "room2": [
    { id: 9, roomId: "room2", senderId: "c2", text: "Hi Michael, are we still on for the 4PM call?", time: "09:00", read: true },
    { id: 10, roomId: "room2", senderId: "u2", text: "Yes, absolutely! I have it marked on my calendar.", time: "09:15", read: true },
    { id: 11, roomId: "room2", senderId: "c2", text: "Are we still on for...", time: "23:16", read: false }
  ],
  "room3": [
    { id: 12, roomId: "room3", senderId: "c3", text: "Hey Sarah, Can you help me with my account?", time: "22:28", read: false },
    { id: 13, roomId: "room3", senderId: "c3", text: "I can't seem to access the new dashboard features.", time: "22:29", read: false }
  ],
  "room4": [
    { id: 14, roomId: "room4", senderId: "u1", text: "Hi Diana, I've enabled the feature for your account.", time: "14:05", read: true },
    { id: 15, roomId: "room4", senderId: "c4", text: "Perfect, everything works now. Thanks!", time: "14:10", read: true }
  ],
  "room5": [
    { id: 16, roomId: "room5", senderId: "c1", text: "Hi Olivia, Can we schedule a call for tomorrow?", time: "09:00", read: true }
  ],
  "room6": [
    { id: 17, roomId: "room6", senderId: "c5", text: "Hi Ethan, just checking in on the project status.", time: "10:20", read: true },
    { id: 18, roomId: "room6", senderId: "u4", text: "Looking forward to it!", time: "10:30", read: true }
  ],
  "room7": [
    { id: 19, roomId: "room7", senderId: "c6", text: "Hi Sophia, I have a question about the invoice.", time: "11:45", read: false }
  ]
};
