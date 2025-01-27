import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

      <div className="grid grid-rows-[20px_1fr] items-center justify-items-center p-8 sm:p-20  gap-10  ">
        <div className="flex flex-col gap-8 row-start-2 items-center justify-items-center sm:items-start">

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Task Manager
          </h2>
          <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] max-w-lg">
            <p>Creating a responsive web application for personal
              task management. The app should work seamlessly on PCs, tablets, and mobile devices,
              featuring an elegant and functional interface built with Next.js, TypeScript, and Tailwind CSS.</p>
          </div>

          <div className="self-center">
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

  );
}
