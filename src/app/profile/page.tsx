"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const UserProfile: React.FC = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        // Add validation logic here
        if (name && email) {
            setEditMode(false);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
                <Image
                    src="https://picsum.photos/150"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mb-4"
                />
                {editMode ? (
                    <form onSubmit={handleSave} className="w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-800"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-800"
                            />
                        </div>
                        <button
                            type='submit'
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="text-gray-700">{email}</p>
                        <button
                            onClick={() => setEditMode(true)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;