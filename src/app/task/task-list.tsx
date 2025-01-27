import React from 'react'
import { Task } from '../lib/interface';

interface TaskListProps {
    filteredTasks: Task[];
    handleEditTask: (task: Task) => void;
    deleteTask: (id: number) => void;
}

export default function TaskList({ filteredTasks, handleEditTask, deleteTask }: TaskListProps) {
    return (
        <div className='flex gap-4 w-full p-4 rounded shadow bg-gray-800 overflow-x-auto'>
            <table className='table-auto w-full'>
                <thead>
                    <tr className="">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
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
                                    className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEditTask(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deleteTask(task.id!)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
