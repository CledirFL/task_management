import React from 'react'
import { Task } from '../lib/interface';

interface FeedbackMessageProps {
    feedbackMessage: string;
    deletedTask?: Task | null;
    undoDelete?: () => void;
    size?: 'small' | 'large';
}

export default function FeedbackMessage({ feedbackMessage, deletedTask, undoDelete, size = 'small' }: FeedbackMessageProps) {
    return (
        <div className={`px-4 py-3 rounded mb-4 ${size === 'small' ? 'w-full' : 'w-1/5'} mt-5 ${deletedTask ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
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
