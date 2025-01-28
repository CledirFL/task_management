"use client"
import Button from '@/components/Button';
import Image from 'next/image';
import React, { useState } from 'react';

const UserProfile: React.FC = () => {
    const [name, setName] = useState('Kelton Cabral');
    const [email, setEmail] = useState('keltonlabrac@gmail.com');
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        if (name && email) {
            setEditMode(false);
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleCancel = () => {
        setName('Kelton Cabral');
        setEmail('keltonlabrac@gmail.com');
        setEditMode(false);
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Profile Page</h1>
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
                                    minLength={3}
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
                            <div className="flex gap-4">
                                <Button type='submit' rounded='rounded-md'>Save</Button>
                                <Button onClick={handleCancel} variant='outline' rounded='rounded-md'>cancel</Button>
                            </div>

                        </form>
                    ) : (
                        <div className="text-center flex    flex-col">
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="text-gray-700">{email}</p>
                            <div className='mt-4 px-4 self-center'>
                                <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default UserProfile;