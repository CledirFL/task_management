"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function SideBar() {
    const pathName = usePathname();
    const isActive = (path: string) => pathName === path;

    if (pathName === '/') {
        return null;
    }

    return (
        <aside className="w-64 bg-background shadow-lg text-white border-r border-gray-900 hidden md:block">
            <div className="p-4 font-bold text-xl border-b border-gray-800">
                <Link href="/">
                    Task Manager
                </Link>
            </div>
            <nav className="mt-5">
                <ul className='flex flex-col gap-2'>
                    <li className="mb-2 ml-4">
                        <Link href="/task" legacyBehavior>
                            <a className={`text-gray-700 hover:text-gray-300 ${isActive('/task') ? 'font-bold text-gray-100' : ''}`}>Task Board</a>
                        </Link>
                    </li>
                    <li className="mb-2 ml-4">
                        <Link href="/profile" legacyBehavior>
                            <a className={`text-gray-700 hover:text-gray-300 ${isActive('/profile') ? 'font-bold text-gray-100' : ''}`} >User Profile</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
