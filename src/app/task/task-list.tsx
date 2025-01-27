import React from 'react'
import { Task } from '../lib/interface';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaskListProps {
    filteredTasks: Task[];
    handleEditTask: (task: Task) => void;
    deleteTask: (id: number) => void;
}

export default function TaskList({ filteredTasks, handleEditTask, deleteTask }: TaskListProps) {
    return (
        <>
            <div className='gap-4 w-full p-4 rounded shadow bg-gray-800 overflow-x-auto hidden md:block'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="w-20 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredTasks.map(task => (
                            <tr key={task.id} className="border-b">
                                <td className="px-4 py-2 text-center">{task.title}</td>
                                <td className="px-4 py-2 text-center">{task.description}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-white ${task.status === 'Done' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center flex gap-3 justify-center">
                                    <button
                                        className=" hover:text-gray-400 text-gray-500 font-bold py-2 px-2 rounded"
                                        onClick={() => handleEditTask(task)}
                                    >
                                        <FaEdit size={24} />
                                    </button>
                                    <button
                                        className="hover:opacity-30 text-red-700 font-bold py-2 px-4 rounded"
                                        onClick={() => deleteTask(task.id!)}
                                    >
                                        <FaTrash size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='md:hidden flex flex-col gap-2'>
                {filteredTasks.map(task => (
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='bg-gray-800 p-4 rounded shadow'>
                            <div className='flex items-center justify-between space-x-2 text-sm'>
                                <p className='font-bold'>{task.title}</p>
                                <div>
                                    <span className={`px-2 py-1 rounded-full text-white ${task.status === 'Done' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between space-x-2 text-sm mt-2'>
                                <p>{task.description}</p>
                                <div className="text-center flex gap-1 justify-center">
                                    <button
                                        className=" hover:text-gray-400 text-gray-500 font-bold py-1 px-1 rounded"
                                        onClick={() => handleEditTask(task)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="hover:opacity-30 text-red-700 font-bold py-1 px-1 rounded"
                                        onClick={() => deleteTask(task.id!)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}
