'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../util/firebase';

 const Logoutbtn = () => {
  return(
      <Dialog>
      <DialogTrigger asChild className='w-full'>
        <Button variant="outline">Logout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Logout</DialogTitle>
          <DialogDescription>
            Do you wish to logout of your account?
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center gap-5'>
        <DialogFooter>
          <Button type="submit"
           onClick={()=>
            {signOut(auth)
           }}
          >Yes</Button>
        </DialogFooter>
        <DialogFooter>
          <Button type="submit">No</Button>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Logoutbtn;