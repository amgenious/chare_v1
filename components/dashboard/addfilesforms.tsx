import React from 'react'
import { Upload } from 'lucide-react';
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
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../util/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { uploadFile, getFile } from "../util/storage";
import { Label } from '../ui/label';
const Addfilesforms = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState();
  const [uploaded, setUploaded] = useState("");
  const [category, setCategory] = useState("");
  const [documentid, setDocumentId] = useState('');
  const [userid, setUserid] = useState("");
  const [filename, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const Userid = user.uid;
      setUserid(Userid);
    } else {
      router.push("/auth/login");
    }
  });

  const handleUpload = async () => {
    setLoading(true);

     try {
      const folder = "items/";
      const imagePath = await uploadFile(selectedFile, folder);
      const imageUrl = await getFile(imagePath);
      setUploaded(imageUrl);
      setDocumentId(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleData = async (e:any) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "products"), {
        document: documentid,
        category: category,
        userid: userid,
        filename: filename,
        timeStamps: serverTimestamp(),
      });
      alert("Document sent successfully");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog>
    <DialogTrigger asChild className='cursor-pointer'>
      <Upload />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Upload File</DialogTitle>
        <DialogDescription>
          Upload all your files through here.
        </DialogDescription>
      </DialogHeader>
      <form  onSubmit={handleData}>
      <div className="grid gap-4 py-2">
        <div className="flex items-center gap-4">
         <Input type='file' id='file'  onChange={(e:any) => setSelectedFile(e.target.files[0])} required/>
         <div className='w-fit bg-white text-black p-2 rounded-lg cursor-pointer text-sm'  onClick={handleUpload}>Submit</div>
        </div>
        {
          loading ? (
            <p className="mb-3 text-blue-600 text-xs">
              <span>Sending...</span>
            </p>
          ) : uploaded ? (
            <>
          <div className="grid items-center gap-4 pt-2">
            <Label>File Name</Label>
            <Input placeholder="file name" onChange={(e)=> setFileName(e.target.value)} required/>
        <p className="text-sm mb-1">Please select category</p>
        <select
          className="border bg-black w-[100%] p-2 mb-5"
          onChange={(e) => setCategory(e.target.value)}
          required
          >
          <option></option>
          <option disabled>
            Category
          </option>
          <option value="document">document</option>
          <option value="picture">picture</option>
          <option value="video">video</option>
          <option value="music">sound</option>
        </select>
        </div>
      <DialogFooter>
      <Button>Upload file</Button>
      </DialogFooter>
          </>): (
          <p className="mb-3 text-blue-600 text-xs"></p>
        )}
      </div>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default Addfilesforms;