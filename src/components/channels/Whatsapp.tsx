import React from "react";
import { Icon } from "@iconify/react";

interface InstagramProps {
  title: string;
}

const Instagram: React.FC<InstagramProps> = ({ title }) => {
  return (
    <div className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center gap-x-2 cursor-pointer">
      <div className="min-w-4 size-4 rounded-full text-[10px] font-medium text-white bg-[#60D669] flex items-center justify-center">
        <Icon icon="ic:baseline-whatsapp" className="size-2.5" />
      </div>

      <h5 className="text-[10px] font-medium text-gray-800">{title}</h5>
    </div>
  );
};

export default Instagram;
