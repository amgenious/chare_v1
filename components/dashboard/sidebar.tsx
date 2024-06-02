'use client'
import React from 'react'
import Link from "next/link"
import {
    Home,
    Package,
    Settings,
    Users,
  } from "lucide-react"
 
  import { GiHypersonicBolt } from "react-icons/gi";
  import { usePathname } from 'next/navigation';
  import clsx from 'clsx';
import Logoutbtn from './logoutbtn';
const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <div className="flex items-center gap-2 font-semibold">
        <GiHypersonicBolt />
          <span className="">Chare</span>
        </div>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/dashboard"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              'bg-muted text-slate-300 ': pathname === "/dashboard",
            },
            ) 
            }
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/files"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              'bg-muted text-slate-300 ': pathname === "/dashboard/files",
            },
            ) 
            }
          >
            <Package className="h-4 w-4" />
            Files
          </Link>
          <Link
            href="/dashboard/groups"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              'bg-muted text-slate-300 ': pathname === "/dashboard/groups",
            },
            ) 
            }
          >
            <Users className="h-4 w-4" />
            Groups
          </Link>
          <Link
            href="/dashboard/settings"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              'bg-muted text-slate-300 ': pathname === "/dashboard/settings",
            },
            ) 
            }
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="p-4">
      <Logoutbtn />
      </div>
    </div>
  </div>
  )
}

export default SideBar