import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GiHypersonicBolt } from "react-icons/gi";
import { useRouter } from "next/router"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/components/util/firebase"
const SignupForm =()=> {
  const router = useRouter();
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  

  const handlesignin=(e:any) => {
    e.preventDefault()
  
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    router.push('/auth/login');
  })
  .catch((error) => {
   setError(true)
   setErrorMessage(error.message);
  });
  }
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex justify-center items-center gap-2 mb-2">
        <GiHypersonicBolt />
        <CardTitle className="text-2xl">Chare</CardTitle>  
        </div>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to sign up for an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4"  onSubmit={handlesignin}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={e=>setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          {error && <span>{errorMessage}</span>}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
export default SignupForm;