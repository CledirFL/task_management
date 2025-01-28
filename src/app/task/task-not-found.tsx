import Button from '@/components/Button';
import React from 'react'
interface NoTaskFoundProps {
    onCreateNew: () => void;
}

export default function TaskNotFound({ onCreateNew }: NoTaskFoundProps) {
    return (
        <div className="text-center mt-8 flex flex-col items-center">
            <p className="text-gray-400 mb-4">No tasks available. Create a new task to get started.</p>

            <Button onClick={onCreateNew} >
                Create New Task
            </Button>
        </div>
    )
}
