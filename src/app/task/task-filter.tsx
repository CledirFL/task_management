import React from 'react'

interface TaskFilterProps {
    filter: 'All' | 'To Do' | 'In Progress' | 'Done';
    setFilter: (filter: 'All' | 'To Do' | 'In Progress' | 'Done') => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function TaskFilter({ filter, setFilter, setIsModalOpen }: TaskFilterProps) {
    return (
        <div className="flex gap-3 justify-end mb-4">
            <div>
                <label className="mr-2">Filter tasks by status:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'All' | 'To Do' | 'In Progress' | 'Done')}
                    className="border rounded p-2 bg-gray-800 border-gray-800 text-white"
                >
                    <option value="All">All</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Add New Task
            </button>
        </div>
    )
}
