"use client";
import Link from "next/link";
import {useState, useEffect} from "react";
import {
  CircleUser,
  Home,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logoutbtn from "./logoutbtn";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../util/firebase";

export const Navbar = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('')
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.email;
        const text = uid!.slice(0,2)
        setEmail(text)
      } 
    });
    return () => {
      unsubscribe();
    };
  }, [])


  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-muted text-slate-300 ": pathname === "/dashboard",
                }
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/files"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-muted text-slate-300 ": pathname === "/dashboard/files",
                }
              )}
            >
              <Package className="h-4 w-4" />
              Files
            </Link>
            <Link
              href="/dashboard/groups"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-muted text-slate-300 ": pathname === "/dashboard/groups",
                }
              )}
            >
              <Users className="h-4 w-4" />
              Groups
            </Link>
            <Link
              href="/dashboard/settings"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-muted text-slate-300 ":
                    pathname === "/dashboard/settings",
                }
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
          <div className="mt-auto">
            <Card className="bg-transparent border-none">
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
               <Logoutbtn />
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <div className="h-5 w-5 rounded-full uppercase">
              {email}
            </div>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
