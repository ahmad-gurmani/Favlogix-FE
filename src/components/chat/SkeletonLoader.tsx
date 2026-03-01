import React from "react";
import Skeleton from "@/components/common/Skeleton";

const SkeletonLoader: React.FC = () => {
    return (
        <div className="w-full h-full flex gap-x-2 overflow-hidden relative">
            {/* Sidebar Skeleton (Leftmost) */}
            <div className="w-16 bg-[#FDFDFD] border-r border-gray-100 flex flex-col items-center py-4 gap-y-6 shrink-0">
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
            </div>

            {/* Rail Skeleton (Middle-Left) */}
            <div className="w-72 bg-white border-r border-gray-100 flex flex-col overflow-hidden shrink-0">
                <div className="h-12 px-4 border-b border-gray-100 flex items-center justify-between">
                    <Skeleton variant="rounded" width={80} height={20} />
                    <Skeleton variant="rounded" width={20} height={20} />
                </div>
                <div className="p-4 flex flex-col gap-y-4">
                    <Skeleton variant="rounded" width="100%" height={32} />
                    <div className="flex gap-2">
                        <Skeleton variant="rounded" width={60} height={24} />
                        <Skeleton variant="rounded" width={60} height={24} />
                    </div>
                </div>
                <div className="flex-1 px-3 flex flex-col gap-y-3 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="p-3 border border-gray-100 rounded-lg flex items-center gap-x-3">
                            <Skeleton variant="circular" width={32} height={32} className="shrink-0" />
                            <div className="flex-1 flex flex-col gap-y-2">
                                <div className="flex justify-between">
                                    <Skeleton variant="text" width="60%" height={8} />
                                    <Skeleton variant="text" width="20%" height={8} />
                                </div>
                                <Skeleton variant="text" width="90%" height={8} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area Skeleton (Central) */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden">
                <div className="h-12 px-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="rounded" width={120} height={20} />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="circular" width={24} height={24} />
                    </div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-y-6 overflow-hidden">
                    <div className="flex justify-start">
                        <Skeleton variant="rounded" width="40%" height={60} className="rounded-2xl rounded-tl-none" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton variant="rounded" width="35%" height={80} className="rounded-2xl rounded-tr-none" />
                    </div>
                    <div className="flex justify-start">
                        <Skeleton variant="rounded" width="50%" height={40} className="rounded-2xl rounded-tl-none" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton variant="rounded" width="30%" height={50} className="rounded-2xl rounded-tr-none" />
                    </div>
                    <div className="flex justify-start">
                        <Skeleton variant="rounded" width="45%" height={70} className="rounded-2xl rounded-tl-none" />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <Skeleton variant="rounded" width="100%" height={80} />
                </div>
            </div>

            {/* Details Skeleton (Rightmost) */}
            <div className="w-80 bg-white border-l border-gray-100 hidden lg:flex flex-col p-6 gap-y-6 overflow-hidden shrink-0">
                <div className="flex items-center justify-between">
                    <Skeleton variant="rounded" width={80} height={20} />
                    <Skeleton variant="rounded" width={20} height={20} />
                </div>
                <div className="flex flex-col gap-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-y-2">
                            <div className="flex justify-between items-center">
                                <Skeleton variant="text" width="40%" height={8} />
                                <Skeleton variant="rounded" width={16} height={16} />
                            </div>
                        </div>
                    ))}
                </div>
                <Skeleton variant="text" width="30%" height={12} className="mt-4" />
                <div className="flex flex-col gap-y-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton variant="circular" width={32} height={32} />
                            <div className="flex-1 flex flex-col gap-y-2">
                                <Skeleton variant="text" width="60%" height={8} />
                                <Skeleton variant="text" width="40%" height={6} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
