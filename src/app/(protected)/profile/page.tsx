import { Suspense } from "react";
import {
  SectionTabs,
  UserInfo,
  UserInfoSkeleton,
} from "@/components/profile";
import {
  getUserInfo,
} from "@/server/queries";
import { ProfileClient } from "@/components/profile/profile-client";
import { ShieldCheckIcon, BellIcon, Edit2Icon } from "lucide-react";

export default async function ProfilePage() {
  const userPromise = getUserInfo();

  return (
    <ProfileClient>
      <div className="flex flex-col gap-y-3.5 p-6 pt-3 overflow-y-auto h-full scrollbar-hide">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-1 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-gray-800 tracking-tight">
              Vista Profesional
            </h1>
            <div className="h-3 w-px bg-gray-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-[8px] text-gray-400 bg-white/40 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-100/50 shadow-sm uppercase tracking-wider font-bold">
              <ShieldCheckIcon className="w-2.5 h-2.5 text-blue-500" />
              <span>Google Neural Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 hover:bg-white/60 px-2 py-1 rounded-lg transition-all text-[11px] font-bold backdrop-blur-sm border border-transparent hover:border-gray-200 h-8">
              <Edit2Icon className="w-3 h-3" />
              Editar
            </button>
            <button className="p-1.5 text-gray-500 hover:bg-white/60 hover:text-gray-900 rounded-lg transition-all relative backdrop-blur-sm border border-transparent hover:border-gray-200 h-8">
              <BellIcon className="w-3.5 h-3.5" />
              <span className="absolute top-2 right-2 w-1 h-1 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/** Info user */}
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo userPromise={userPromise} />
        </Suspense>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <SectionTabs />
        </div>
      </div>
    </ProfileClient>
  );
}
