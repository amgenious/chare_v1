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
const ForgotPasswordForm =()=> {
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex justify-center items-center gap-2 mb-2">
        <GiHypersonicBolt />
        <CardTitle className="text-2xl">Chare</CardTitle>  
        </div>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below of your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
export default ForgotPasswordForm;