"use client";
import React, { useEffect } from "react";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Creategroup = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState();
  const [userid, setUserid] = useState("");
  const [useremail, setUserEmail] = useState("");

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const Userid = user.uid;
      const UserEmail = user.email;
    setUserEmail(UserEmail!);
    setUserid(Userid);
} else {
    router.push("/auth/login");
}
});
}, []);

  const handleData = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "groups"), {
        groupname: groupName,
        members: [useremail,],
        userid: userid,
        sharedItems: [],
        timeStamps: serverTimestamp(),
      });
      alert("Group created successfully");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <CirclePlus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Share items to your friends or colleages through a Group
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleData}>
          <div className="grid gap-4 py-2">
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Group Name"
                onChange={(e:any) => setGroupName(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button>Create Group</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Creategroup;
