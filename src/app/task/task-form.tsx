import React from 'react';
import { Task } from '../lib/interface';

interface TaskFormProps {
    newTask: Task;
    setNewTask: (task: Task) => void;
    addTask: () => void;
    editTask: (id: number, task: Task) => void;
    handleCancel: () => void;
}

export default function TaskForm({ newTask, setNewTask, addTask, editTask, handleCancel }: TaskFormProps) {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">{newTask.id ? "Update the task" : "Add new task"}</h2>
            <form
                className='flex flex-col gap-4'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newTask.id) {
                        editTask(newTask.id, newTask);
                    } else {
                        addTask();
                    }
                }}
            >
                <input
                    required
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border rounded p-2 bg-gray-800 border-gray-800 text-white"
                />
                <input
                    required
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border rounded p-2 bg-gray-800 border-gray-800 text-white"
                />
                <select
                    required
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'To Do' | 'In Progress' | 'Done' })}
                    className="border rounded p-2 bg-gray-800 border-gray-800 text-white"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {newTask.id ? 'Update Task' : 'Add Task'}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}
