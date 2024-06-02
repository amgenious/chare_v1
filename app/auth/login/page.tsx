'use client'
import {useState} from 'react'
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
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/util/firebase"
import { useRouter } from 'next/navigation';

const LoginForm =()=> {
  const router = useRouter();
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const handlelogin=(e:any) => {  
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    router.push('/dashboard');
    
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlelogin}>
        <div className="grid gap-4">
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
          <Input id="password" type="password" required onChange={e=>setPassword(e.target.value)}/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              
              <Link href="/auth/forgotpassword" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
           
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          {error && <span className='text-center text-red-600 pt-1'>{errorMessage}</span>} 
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
          </form>
      </CardContent>
    </Card>
    </div>
  )
}
export default LoginForm;