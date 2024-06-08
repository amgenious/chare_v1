'use client'
import Creategroup from '@/components/dashboard/creategroup';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { EllipsisVertical, User, UsersRound } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth ,db} from "@/components/util/firebase";
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { onAuthStateChanged } from 'firebase/auth';

const GroupPage = () => {
  const [data, setData] = useState([]);
  const [userid, setUserid] = useState("");
  const colRef = collection(db, "groups");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [useremail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try{
        setLoading(true);
        if (!user) {
          router.push("/auth/login");
        } else {
          const Userid = user.uid;
          const UserEmail = user.email;
          setUserEmail(UserEmail!);
          setUserid(Userid);
          const q1 = query(
          colRef,
          where("members", "array-contains", UserEmail),
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
          let list:any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        });
        return () => {
          unsubscribeSnapshot();
        };
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const deleteItem = async (id:any) => {
    try {
      await deleteDoc(doc(db, "groups", id));
      setData((prevData) => prevData.filter((items:any) => items.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
        <Creategroup />
      </div>
      <div
        className="flex flex-1 p-3 rounded-lg border shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
       <div className="flex flex-col gap-3 w-full">
       {
          loading ? (
            <>
            <div className='h-fit border flex gap-5 bg-zinc-900 p-3 items-center'>
              <Skeleton className='w-14 h-14 rounded-2xl bg-zinc-950' />
              <Skeleton className='p-2 w-32 h-2 text-sm text-center bg-zinc-950'/>
            </div>
            </>
          ): data.length > 0 ? (
            data.map((items:any) => (
          <Link href="#" key={items.name}>
          <div className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center hover:bg-zinc-700 cursor-pointer">
            <div className="flex items-center gap-2">
            <UsersRound size={50} />
            <p className="text-xs">{items.groupname}</p>
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
      ))
      ) : (
        <p>Groups Created or Added</p>
        )
}
      </div>
      </div>
    </main>
  )
}

export default GroupPage;
