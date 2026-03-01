import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "./routeConfig";

// Lazy load pages for better performance
const SplashPage = lazy(() => import("@/pages/SplashPage"));
const ChatApp = lazy(() => import("@/pages/ChatPage"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<SplashPage />} />

        <Route path={ROUTES.CHAT} element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
