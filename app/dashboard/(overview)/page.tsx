'use client'
import Addfilesforms from "@/components/dashboard/addfilesforms";
import { Clapperboard, Folder, Image, Music } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth ,db} from "@/components/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const  DashboardPage = ()=> {
  const [picture, setPicture] = useState([]);
  const [video, setVideo] = useState([]);
  const [document, setDocument] = useState([]);
  const [sound, setSound] = useState([]);
  const [userid, setUserid] = useState("");
  const colRef = collection(db, "products");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      } else {
        const Userid = user.uid;
        setUserid(Userid);
        const q1 = query(
          colRef,
          where("category", "==", "picture"),
          where("userid", "==", Userid)
        );
        const q2 = query(
          colRef,
          where("category", "==", "document"),
          where("userid", "==", Userid)
        );
        const q3 = query(
          colRef,
          where("category", "==", "video"),
          where("userid", "==", Userid)
        );
        const q4 = query(
          colRef,
          where("category", "==", "sound"),
          where("userid", "==", Userid)
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
          let list:any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setPicture(list.length);
        });
        const unsubscribeSnapshot1 = onSnapshot(q2, (snapShot) => {
          let list:any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setDocument(list.length);
        });
        const unsubscribeSnapshot2 = onSnapshot(q3, (snapShot) => {
          let list:any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setVideo(list.length);
        });
        const unsubscribeSnapshot3 = onSnapshot(q4, (snapShot) => {
          let list:any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setSound(list.length);
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className='flex justify-between'>
        <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>    
          <Addfilesforms />
        </div>
          <div
            className="flex flex-1 rounded-lg shadow-sm p-2 justify-center" x-chunk="dashboard-02-chunk-1"
          >
            <div className="grid gap-5 md:grid-cols-3 grid-cols-1 w-full h-fit text-center">
    <Card className="p-2 hover:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
        <Folder className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-left">{document}</div>
      </CardContent>
    </Card>
    <Card className="p-2 hover:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
        <Clapperboard className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-left">{video}</div>
      </CardContent>
    </Card>
    <Card className="p-2 hover:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sounds</CardTitle>
        <Music className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-left">{sound}</div>
      </CardContent>
    </Card>
    <Card className="p-2 hover:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Images</CardTitle>
        <Image className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-left">{picture}</div>
      </CardContent>
    </Card>
            </div>
          </div>
        </main>
  )
}


export default DashboardPage;