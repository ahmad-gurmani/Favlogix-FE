export const ROUTES = {
  HOME: "/",
  CHAT: "/chat",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
