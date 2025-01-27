import React from 'react'
interface NoTaskFoundProps {
    onCreateNew: () => void;
}

export default function TaskNotFound({ onCreateNew }: NoTaskFoundProps) {
    return (
        <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">No tasks available. Create a new task to get started.</p>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={onCreateNew}
            >
                Create New Task
            </button>
        </div>
    )
}
