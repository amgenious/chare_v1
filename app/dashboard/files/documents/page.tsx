'use client'
import { CircleArrowLeft, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import Addfilesforms from '@/components/dashboard/addfilesforms';
import { auth ,db} from "@/components/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Skeleton } from '@/components/ui/skeleton';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@radix-ui/react-context-menu';

const DocumentsPage = () => {
  const [data, setData] = useState([]);
  const [userid, setUserid] = useState("");
  const colRef = collection(db, "products");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try{
        setLoading(true);
        if (!user) {
          router.push("/auth/login");
        } else {
          const Userid = user.uid;
          setUserid(Userid);
          const q1 = query(
          colRef,
          where("category", "==", "document"),
          where("userid", "==", Userid)
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
      await deleteDoc(doc(db, "products", id));
      setData((prevData) => prevData.filter((items:any) => items.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div className='flex justify-between'>
        <div className="flex items-center gap-4">
            <Link href='/dashboard/files/'>
        <CircleArrowLeft />
            </Link>
        <h1 className="text-lg font-semibold md:text-2xl">Documents</h1>
        </div>    
      <Addfilesforms />
        </div>
        <div
        className="flex flex-1 p-3 rounded-lg border shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-wrap gap-5 justify-center">
          {
          loading ? (
            <>
            <div className='h-fit border flex flex-col bg-zinc-900 p-3 items-center'>
              <Skeleton className='w-32 h-32 rounded-2xl bg-zinc-950' />
              <Skeleton className='p-2 mt-2 w-full text-sm text-center bg-zinc-950'/>
            </div>
            <div className='h-fit border flex flex-col bg-zinc-900 p-3 items-center'>
              <Skeleton className='w-32 h-32 rounded-2xl bg-zinc-950' />
              <Skeleton className='p-2 mt-2 w-full text-sm text-center bg-zinc-950'/>
            </div>
            <div className='h-fit border flex flex-col bg-zinc-900 p-3 items-center'>
              <Skeleton className='w-32 h-32 rounded-2xl bg-zinc-950' />
              <Skeleton className='p-2 mt-2 w-full text-sm text-center bg-zinc-950'/>
            </div>
            <div className='h-fit border flex flex-col bg-zinc-900 p-3 items-center'>
              <Skeleton className='w-32 h-32 rounded-2xl bg-zinc-950' />
              <Skeleton className='p-2 mt-2 w-full text-sm text-center bg-zinc-950'/>
            </div>
            </>
          ) :
          data.length > 0 ? (
            data.map((items:any) => (
              <div key={items.id} className="h-fit border flex flex-col bg-zinc-900 p-3 items-center">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-32 h-32"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="p-2 text-sm text-center">{items.filename}</p>
                <div className='w-full'>
                <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem className="cursor-pointer">
                <div className="flex justify-evenly w-full">
                    <div
                      className="cursor-pointer"
                      onClick={(id) => deleteItem(items.id)}
                    >
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </p>
                    </div>
                    <div>
                    <a href={items.document} download={items.filename}>
                      <div className="cursor-pointer">
                        <p className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="blue"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                          </svg>
                        </p>
                      </div>
                    </a>
                      </div>
                    <div className="cursor-pointer">
                      <p className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                          >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                            />
                        </svg>
                      </p>
                    </div>
                  </div>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            </div>
              </div>
            ))
          ) : (
            <p>No available Pictures</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default DocumentsPage;
