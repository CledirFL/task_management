"use client"
import Link from 'next/link'
import React from 'react'
import DrawerMenu from '../DrawerMenu'
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const pathName = usePathname()
    return (
        <nav className="shadow-lg ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-semibold ">Task Manager</h1>
                </Link>
                {pathName !== '/' && (
                    <div className="space-x-6 hidden md:block">
                        <Link href="/task" legacyBehavior>
                            <a className="text-gray-700 hover:text-gray-300">Task Board</a>
                        </Link>
                        <Link href="/profile" legacyBehavior>
                            <a className="text-gray-700 hover:text-gray-300">User Profile</a>
                        </Link>
                    </div>
                )}
                 {/* Drawer Menu for Mobile/Tablet */}
               <DrawerMenu />
            </div>
        </nav>
    )
}
