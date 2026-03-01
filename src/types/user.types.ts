export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  role?: "agent" | "customer";
  lastSeen?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  language: string;
}
