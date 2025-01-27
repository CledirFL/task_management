"use client"
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (

    <div className="grid grid-rows-[20px_1fr] items-center justify-items-center p-8 sm:p-20  gap-10  ">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-items-center sm:items-start">

        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Task Manager
        </h2>
        <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-lg">
          <p>Stay organized and get things done efficiently with our intuitive task
            management app.</p>
        </div>

        <div className="self-center">
          <Button onClick={() => router.push("/task")}>Get Started</Button>
        </div>
      </div>
    </div>

  );
}
