import { Meteors } from "@/components/ui/meteors";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function Home() {

  const words = [
    {
      text: "Share",
    },
    {
      text: "files",
    },
    {
      text: "faster",
    },
    {
      text: "with",
    },
    {
      text: "CHARE.",
      className: "dark:text-purple-800",
    },
  ];

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
     <TypewriterEffect className="text-2xl"  words={words}/>
     <div className="pt-10">
      <Link  href='/dashboard'>
     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Go to Dashboard
        </span>
      </button>
      </Link>
      </div>
      <Meteors number={20} />        
    </main>
  );
}
