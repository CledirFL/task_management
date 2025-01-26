import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <nav className="shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold ">Task Manager</h1>
          <div className="space-x-6">
            <Link href="/task" legacyBehavior>
              <a className="text-gray-700 hover:text-gray-300">Task Board</a>
            </Link>
            <Link href="/profile" legacyBehavior>
              <a className="text-gray-700 hover:text-gray-300">User Profile</a>
            </Link>
          </div>
        </div>
      </nav>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 sm:p-20  gap-16  ">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-items-center sm:items-start">

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
        </main>
        <footer className="row-start-3 flex flex-col mt-5 gap-2  items-center justify-center">

          <p>
            Made by <strong> Kelton Cabral</strong>
          </p>
          <Link className="text-gray-600 hover:text-gray-500" href={"https://github.com/CledirFL"} target="_blank" >
             GitHub
          </Link>
          <Link className="text-gray-600 hover:text-gray-500" href={"https://www.linkedin.com/in/kelton-cabral-cv/"} target="_blank" >
             LinkedIn
          </Link>
        </footer>

      </div>

    </div>
  );
}
