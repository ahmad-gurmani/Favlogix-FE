import AppRoutes from "@/routes/AppRouter";
import { Providers } from "./Providers";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}
