
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { CirclePlus, EllipsisVertical, UsersRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const GroupPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
        <CirclePlus />
      </div>
      <div
        className="flex flex-1 p-3 rounded-lg border shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
       <div className="flex flex-col gap-3 w-full">
          <Link href="#">
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
            <UsersRound size={50} />
            <p className="text-xs">Group Name</p>
            </div>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                  Add Members
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default GroupPage;
