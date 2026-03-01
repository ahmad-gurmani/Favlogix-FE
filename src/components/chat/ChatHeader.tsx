import { useState } from "react";
import { Icon } from "@iconify/react";

const menuItems: { name: string; link: string; icon: string }[] = [
  { name: "Inbox", link: "/chat", icon: "mdi:inbox" },
  { name: "Contacts", link: "/contacts", icon: "mdi:users-outline" },
  { name: "Workflows", link: "/", icon: "hugeicons:workflow-square-06" },
  {
    name: "Campaigns",
    link: "/",
    icon: "material-symbols:campaign-outline-rounded",
  },
];

const ChatHeader: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="px-4 py-2 rounded-lg bg-white text-black flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-extrabold text-[#007AEC] tracking-tight">BOX</span>
          <span className="text-xl font-semibold text-[#007AEC] opacity-80 tracking-tight">pad</span>
        </div>

        {/* Menus (Desktop) */}
        <ul className="hidden md:flex items-center gap-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={
                "px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1" +
                (item.name === activeMenu
                  ? " border border-[#D8DEE4] bg-[#EFF2F2]"
                  : "")
              }
              onClick={() => setActiveMenu(item.name)}
            >
              <Icon icon={item.icon} className="size-4 md:size-auto" />
              <span className="hidden lg:block text-[11px] font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right (Desktop) & Hamburger (Mobile) */}
      <div className="flex items-center gap-x-2 relative">
        <div className="hidden md:flex items-center gap-x-2">
          {/* Settings Icon */}
          <div className="px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 hover:bg-gray-100">
            <Icon icon="mdi:cog-outline" />
          </div>

          {/* User Info */}
          <div className="cursor-pointer flex items-center gap-x-1 hover:bg-gray-100 px-2 py-1 rounded-lg">
            <div>
              <div className="w-5 h-5 text-[11px] text-white bg-[#FE3265] rounded-full flex items-center justify-center">
                M
              </div>
            </div>
            <span className="text-[11px] font-medium">Michael Johnson</span>
          </div>
        </div>

        {/* Mobile Hamburger to toggle Dropdown */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg ml-2 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon icon="heroicons:bars-3" className="size-5" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 md:hidden flex flex-col">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
              <div className="w-6 h-6 text-[12px] text-white bg-[#FE3265] rounded-full flex items-center justify-center shrink-0">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold">Michael Johnson</span>
                <span className="text-[10px] text-gray-500">michael@example.com</span>
              </div>
            </div>

            <ul className="flex flex-col py-1">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-[12px] ${item.name === activeMenu ? "bg-gray-50 text-[#007AEC] font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => {
                    setActiveMenu(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon icon={item.icon} className="size-4" />
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-1 mt-1">
              <div className="px-4 py-2 flex items-center gap-2 text-[12px] text-gray-700 hover:bg-gray-50 cursor-pointer text-left">
                <Icon icon="mdi:cog-outline" className="size-4" />
                Settings
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
