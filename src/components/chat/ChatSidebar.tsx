import { Icon } from "@iconify/react";
import ExpansionPanel from "@/components/common/ExpansionPanel";
import Whatsapp from "@/components/channels/Whatsapp";
import Instagram from "@/components/channels/Instagram";
import Skeleton from "@/components/common/Skeleton";
import { useChatStore } from "@/store/useChatStore";

const ChatSidebar: React.FC = () => {
  const { toggleChat, closeChat, isSidebarOpen, closeSidebar, teams, users, channels, setSelectedUser, selectedUserId, isLoading } = useChatStore();

  return (
    <div className={`absolute z-[70] h-full left-0 top-0 bottom-0 shadow-2xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none ${isSidebarOpen ? "translate-x-0 lg:w-48 lg:opacity-100" : "-translate-x-full lg:w-0 lg:opacity-0"} flex w-[85%] sm:w-80 pb-4 bg-[#FAFAF8] rounded-r-2xl rounded-l-none lg:rounded-s-lg lg:rounded-r-none flex-col overflow-hidden shrink-0 lg:relative`}>
      {/* Inbox Header */}
      <div className="h-12 px-4 rounded-s-lg flex items-center justify-between">
        <h4 className="text-[13px] font-bold text-gray-800">Inbox</h4>

        <Icon
          icon="heroicons:x-mark"
          className="size-5 text-gray-400 cursor-pointer md:hidden"
          onClick={closeSidebar}
        />
      </div>

      {isLoading ? (
        <div className="px-4 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <Skeleton width="100%" height={12} />
            <Skeleton width="100%" height={12} />
            <Skeleton width="100%" height={12} />
          </div>
          <div className="flex flex-col gap-y-4">
            <Skeleton width="40%" height={10} />
            <div className="flex flex-col gap-y-2 ml-2">
              <Skeleton width="80%" height={8} />
              <Skeleton width="80%" height={8} />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Skeleton width="40%" height={10} />
            <div className="flex flex-col gap-y-2 ml-2">
              <Skeleton width="70%" height={8} />
              <Skeleton width="70%" height={8} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Menus */}
          <div>
            <ul className="flex flex-col gap-y-1.5 px-2">
              <li
                className="px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-x-2 hover:bg-gray-100"
                onClick={() => { toggleChat(); closeSidebar(); }}
              >
                <Icon icon="heroicons:inbox" className="size-3.5" />
                <span className="text-[11px]">My Inbox</span>
              </li>

              <li
                className="px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-x-2 hover:bg-gray-100"
                onClick={() => { setSelectedUser(null); closeSidebar(); closeChat(); }}
              >
                <Icon icon="heroicons:users" className="size-3.5" />
                <span className="text-[11px]">All</span>
              </li>

              <li
                className="px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-x-2 hover:bg-gray-100"
                onClick={() => { toggleChat(); closeSidebar(); }}
              >
                <Icon icon="heroicons:user-circle" className="size-4" />
                <span className="text-[11px]">Unassigned</span>
              </li>
            </ul>
          </div>

          {/* Others */}
          <div className="px-2">
            {/* Teams */}
            <ExpansionPanel title="Teams" defaultExpanded>
              <div className="py-1 flex flex-col gap-y-1.5">
                {teams.map((team) => (
                  <div key={team.id} className="px-2 py-1.5 rounded-lg flex items-center gap-x-2 cursor-pointer hover:bg-gray-50 mb-1">
                    <div className="min-w-4 size-4 rounded-full text-[10px] font-medium text-[#AFBFC0] flex items-center justify-center">
                      <Icon
                        icon="mdi:account-supervisor-circle"
                        className="size-full bg-white"
                      />
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-[10px] font-medium text-gray-800">{team.name}</h5>
                      <p className="text-[10px] text-gray-500">{team.channelCount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ExpansionPanel>

            {/* Users */}
            <ExpansionPanel title="Users" defaultExpanded>
              <div className="py-1 flex flex-col gap-y-1.5">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`px-2 py-1.5 rounded-lg flex items-center gap-x-2 cursor-pointer hover:bg-gray-50 mb-1.5 ${user.id === selectedUserId ? "bg-white border border-gray-200 shadow-sm" : ""}`}
                    onClick={() => { setSelectedUser(user.id); }}
                  >
                    <div className="relative shrink-0">
                      <div className="min-w-4 size-4 rounded-full text-[10px] font-medium text-[#AFBFC0] flex items-center justify-center">
                        <Icon
                          icon="ic:round-account-circle"
                          className="size-full bg-white"
                        />
                      </div>
                      {user.status === "online" && (
                        <div className="absolute -bottom-0.5 -right-0.5 size-1.5 bg-green-500 border border-white rounded-full"></div>
                      )}
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-[10px] font-medium text-gray-800">
                        {user.name}
                      </h5>
                      <p className="text-[10px] text-gray-500">{user.teamId === "team1" ? "11" : "2"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ExpansionPanel>

            {/* Channels */}
            <ExpansionPanel title="Channels" defaultExpanded>
              <div className="py-1 flex flex-col gap-y-1.5">
                {channels.map((channel) => {
                  if (channel.type === "whatsapp") {
                    return <Whatsapp key={channel.id} title={channel.name} />;
                  } else if (channel.type === "instagram") {
                    return <Instagram key={channel.id} title={channel.name} />;
                  }
                  return null;
                })}
              </div>
            </ExpansionPanel>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
