import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2  items-center justify-center pb-5">
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
    )
}
