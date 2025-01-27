import React from 'react'
import { Task } from '../lib/interface';

interface FeedbackMessageProps {
    feedbackMessage: string;
    deletedTask?: Task | null;
    undoDelete?: () => void;
}

export default function FeedbackMessage({ feedbackMessage, deletedTask, undoDelete, }: FeedbackMessageProps) {
    return (
        <div className={`px-4 py-3 rounded mb-4 w-full md:w-1/3 mt-5 ${deletedTask ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
            {feedbackMessage}
            {deletedTask && (
                <button
                    className="ml-4 text-blue-500 underline"
                    onClick={undoDelete}
                >
                    Undo
                </button>
            )}
        </div>
    )
}
