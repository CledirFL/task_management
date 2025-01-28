import React from 'react'
import DrawerMenu from '../DrawerMenu'

export default function NavBar() {
    return (
        <nav className="shadow-lg ">
            <div className="container mx-auto px-4 pb-4 flex justify-between items-center">
                <div ></div>
                <DrawerMenu />
            </div>
        </nav>
    )
}
