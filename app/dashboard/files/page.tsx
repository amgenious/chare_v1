'use client'
import {
  Folder,
  Music,
  Clapperboard,
  Image,
  EllipsisVertical,
} from "lucide-react";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { auth} from "@/components/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';

const FilesPage = () => {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
      if (!user) {
          router.push('/auth/login')
      } else {
      }
    });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Files</h1>
      </div>
      <div
        className="flex flex-1 p-3 rounded-lg border shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col gap-3 w-full">
          <Link href="/dashboard/files/documents">
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
              <Folder size={45} />
              <p className="text-xs">Documents</p>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                  Empty Documents
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          </Link>
          <Link href="/dashboard/files/videos">
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
            <Clapperboard size={45} />
                <p className="text-xs">Videos</p>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                  Empty Videos
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          </Link>
          <Link href="/dashboard/files/sounds">
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
            <Music size={50} />
            <p className="text-xs">Sounds</p>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                  Empty Sounds
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          </Link>
          <Link href="/dashboard/files/pictures">
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
            <Image size={50} />
            <p className="text-xs">Pictures</p>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                  Empty Pictures
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default FilesPage;
