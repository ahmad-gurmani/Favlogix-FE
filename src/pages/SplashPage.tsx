import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HoneycombIcon {
  id: string;
  icon: string;
  x: string;
  y: string;
  delay: number;
}

const HoneycombIcons: HoneycombIcon[] = [
  { id: "inbox", icon: "/Frame 2147238079.svg", x: "20%", y: "25%", delay: 0 },
  { id: "contacts", icon: "/Frame 2147238081.svg", x: "18%", y: "60%", delay: 0.2 },
  { id: "ai", icon: "/Frame 2147238082.svg", x: "28%", y: "75%", delay: 0.4 },
  { id: "workflows", icon: "/Frame 2147238083.svg", x: "70%", y: "35%", delay: 0.6 },
  { id: "campaigns", icon: "/Frame 2147238082.svg", x: "82%", y: "55%", delay: 0.8 },
  { id: "teams", icon: "/Frame 2147238081.svg", x: "78%", y: "20%", delay: 1.0 },
];

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"loading" | "migrating" | "populating">("loading");
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  useEffect(() => {
    // Start migration after 3 seconds of initial loading
    const migrationTimer = setTimeout(() => {
      setSelectedIconId("inbox");
      setPhase("migrating");
    }, 3000);

    // After migration, start population
    const populationTimer = setTimeout(() => {
      setPhase("populating");
    }, 5000);

    // Navigate to chat after everything is done
    const finalTimer = setTimeout(() => {
      navigate("/chat");
    }, 7000);

    return () => {
      clearTimeout(migrationTimer);
      clearTimeout(populationTimer);
      clearTimeout(finalTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#000000] flex flex-col items-center justify-center text-white font-sans">

      {/* Background Glowing Effects (Behind Overlay) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden scale-110">
        <img
          src="/00c69a8abbe41d20263e894b65c250df_upscayl_3x_digital-art-4x 2.svg"
          className="absolute -left-[20%] -bottom-[20%] w-[100%] h-auto object-contain mix-blend-screen animate-spin-slow"
          alt="Glow Left"
        />
        <img
          src="/00c69a8abbe41d20263e894b65c250df_upscayl_3x_digital-art-4x 3.svg"
          className="absolute -right-[25%] -top-[25%] w-[120%] h-auto object-contain mix-blend-screen animate-spin-slow-reverse"
          alt="Glow Right"
        />
      </div>

      {/* Main Content Container (The Overlay) */}
      <div
        className={`relative z-10 flex-1 w-[calc(100%-40px)] my-7 bg-white/4 rounded-2xl border border-white/5  overflow-hidden flex flex-col items-center justify-between transition-all duration-1000 ${phase === "populating" ? "pt-10 md:pt-20" : "pt-10 md:pt-20"}`}
      >

        {/* GIF and Text Content Wrapper */}
        <div className="flex flex-col items-center">
          {/* Background circular pattern animation - Exact 260x260 */}
          <div className="relative w-[260px] h-[260px] flex items-center justify-center overflow-hidden pointer-events-none mb-4 animate-pulse">
            <img
              src="/rounding-gif.gif"
              className="w-full h-full object-contain"
              alt="Background Effect"
            />
          </div>

          {/* Text Context */}
          <div className={`text-center space-y-3 z-10 relative px-6 transition-all duration-1000 ${phase === "populating" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl text-center">
              {phase === "loading" ? "Extracting Information..." : "Processing Data..."}
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto font-medium opacity-80 leading-relaxed text-center">
              We are extracting information from the above honey combs to your system
            </p>
          </div>
        </div>

        {/* Honeycomb Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {HoneycombIcons.map((item) => {
            const isSelected = selectedIconId === item.id;
            return (
              <div
                key={item.id}
                className={`absolute transition-all duration-1000 ease-in-out pointer-events-auto cursor-pointer group`}
                style={{
                  left: isSelected && phase !== "loading" ? "8%" : item.x,
                  top: isSelected && phase !== "loading" ? "88%" : item.y,
                  transform: isSelected && phase !== "loading" ? "scale(0.7) translate(-50%, -50%)" : "translate(-50%, -50%)",
                  opacity: phase === "populating" && isSelected ? 0 : phase === "populating" ? 0 : 1,
                  zIndex: isSelected ? 50 : 10,
                  transitionDelay: !isSelected ? `${item.delay}s` : "0s",
                }}
              >
                <div className="relative">
                  {/* Highlight for selected icons - Gradient Glow */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-500 rounded-full blur-3xl opacity-80 animate-pulse scale-150"></div>
                  )}

                  {/* SVG Assets */}
                  <div className="relative w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <img src="/Static.svg" className="absolute inset-0 w-full h-full text-white/10" alt="Icon Base" />
                    <img src="/Hover.svg" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" alt="Icon Hover" />
                    <img src={item.icon} className="relative w-8 h-8 z-10 opacity-60 group-hover:opacity-100 transition-all duration-300" alt={item.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dashboard Preview / Bottom Peek - Anchored to Screen Bottom */}
      <div
        className={`fixed bottom-0 w-[80%] h-[40vh] transition-all duration-1000 ease-out z-40 transform translate-x-0 ${phase !== "loading" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
      >
        <div className="w-full h-full bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.8)] overflow-hidden border-x border-t border-white/10 relative">

          {/* Sequential population */}
          <div className="w-full h-full relative">
            {/* Live Populated State */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${phase === "populating" ? "opacity-100 z-20" : "opacity-0 z-0"}`}>
              <img src="/Inbox Dashboard.svg" className="w-full h-full object-contain object-top" alt="Dashboard" />
            </div>

            {/* Skeleton State */}
            <div className={`absolute inset-0 bg-white p-6 flex flex-col gap-6 animate-pulse transition-opacity duration-1000 ${phase !== "populating" ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
              <div className="h-10 w-full bg-gray-100 rounded-lg flex items-center px-4 gap-8">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-6 h-full">
                <div className="w-1/4 h-full bg-gray-50 rounded-xl"></div>
                <div className="flex-1 h-full bg-gray-50 rounded-xl p-8 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-16 w-full bg-gray-100 rounded-lg"></div>
                  <div className="h-16 w-full bg-gray-100 rounded-lg"></div>
                </div>
                <div className="w-1/4 h-full bg-gray-50 rounded-xl"></div>
              </div>
            </div>

            {/* Seamless migration target overlay */}
            <div className={`absolute top-4 left-6 h-10 w-10 flex items-center justify-center transition-all duration-1000 ${phase === "migrating" ? "opacity-100 scale-110" : "opacity-0 scale-50"}`}>
              <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-ping"></div>
              <img src="/Frame 2147238079.svg" className="size-6 relative z-10 opacity-40 animate-pulse" alt="Target Destination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
