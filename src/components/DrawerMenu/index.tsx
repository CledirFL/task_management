"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DrawerMenu() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const pathName = usePathname();

    const handleLinkClick = () => {
        setDrawerOpen(false);
    };
    console.log("router:", pathName);

    const isActive = (path: string) => pathName === path;

    return (
        <div className="md:hidden">
            <button
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setDrawerOpen(false)}
                    ></div>
                    <div className="relative flex flex-col w-64 h-full bg-background shadow-xl">
                        <button
                            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none self-end"
                            onClick={() => setDrawerOpen(false)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <nav className="flex-grow p-4">
                            <ul className="space-y-6">
                                <li className="mb-2 ml-4">
                                    <Link href="/" legacyBehavior>
                                        <a className={`text-gray-700 hover:text-gray-300 ${isActive('/') ? 'font-bold text-gray-300' : ''}`} onClick={handleLinkClick}>Home</a>
                                    </Link>
                                </li>
                                <li className="mb-2 ml-4">
                                    <Link href="/task" legacyBehavior>
                                        <a className={`text-gray-700 hover:text-gray-300 ${isActive('/task') ? 'font-bold text-gray-300' : ''}`} onClick={handleLinkClick}>Task Board</a>
                                    </Link>
                                </li>
                                <li className="mb-2 ml-4">
                                    <Link href="/profile" legacyBehavior>
                                        <a className={`text-gray-700 hover:text-gray-300 ${isActive('/profile') ? 'font-bold text-gray-300' : ''}`} onClick={handleLinkClick}>User Profile</a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}
