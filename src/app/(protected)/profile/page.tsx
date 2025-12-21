import { Suspense } from "react";
import {
  SectionTabs,
  UserInfo,
  UserInfoSkeleton,
} from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getUserInfo,
} from "@/server/queries";
import { CameraIcon } from "lucide-react";
export default async function ProfilePage() {
  const userPromise = getUserInfo();
  return (
    <div className="flex flex-col gap-y-4">
      <section className="flex bg-[url('/images/placeholder.svg')] bg-center bg-cover min-h-40 rounded-md relative p-4">
        <Button type="button" variant={"outline"} title="Cambiar banner">
          <CameraIcon />
          Cambiar banner
        </Button>
      </section>
      {/** Info user */}
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo userPromise={userPromise} />
      </Suspense>
      <Separator />
      <SectionTabs />
    </div>
  );
}
