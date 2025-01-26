"use client"
import { useState } from 'react';

interface Task {
    id?: number;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

const sampleTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description for task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description for task 3', status: 'Done' },
    { id: 4, title: 'Task 4', description: 'Description for task 4', status: 'To Do' },
    { id: 5, title: 'Task 5', description: 'Description for task 5', status: 'In Progress' },
    { id: 6, title: 'Task 6', description: 'Description for task 6', status: 'Done' },
    { id: 7, title: 'Task 7', description: 'Description for task 7', status: 'To Do' },
    { id: 8, title: 'Task 8', description: 'Description for task 8', status: 'In Progress' },
    { id: 9, title: 'Task 9', description: 'Description for task 9', status: 'Done' },
    { id: 10, title: 'Task 10', description: 'Description for task 10', status: 'To Do' },
];

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>(sampleTasks);
    const [newTask, setNewTask] = useState<Task>({ title: '', description: '', status: 'To Do' });
    const [filter, setFilter] = useState<'All' | 'To Do' | 'In Progress' | 'Done'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null);

    const addTask = () => {
        setTasks([...tasks, { ...newTask, id: Date.now() }]);
        setNewTask({ title: '', description: '', status: 'To Do' });
        // set modal false
        setFeedbackMessage('Task created successfully!');
        setTimeout(() => setFeedbackMessage(null), 3000);
    };

    const editTask = (id: number, updatedTask: Partial<Task>) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
        setIsModalOpen(false);
        setFeedbackMessage('Task updated successfully!');
        setTimeout(() => setFeedbackMessage(null), 3000);
        setNewTask({ title: '', description: '', status: 'To Do' });
    };

    const handleEditTask = (task: Task) => {
        setNewTask(task);
        setIsModalOpen(true);
    }

    const deleteTask = (id: number) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (taskToDelete) {
            setDeletedTask(taskToDelete);
            setTasks(tasks.filter(task => task.id !== id));
            setFeedbackMessage('Task deleted. Undo?');
            const timeout = setTimeout(() => {
                setDeletedTask(null);
                setFeedbackMessage(null);
            }, 30000);
            setUndoTimeout(timeout);
        }
    };
    const undoDelete = () => {
        if (deletedTask) {
            setTasks([...tasks, deletedTask]);
            setDeletedTask(null);
            setFeedbackMessage(null);
            if (undoTimeout) {
                clearTimeout(undoTimeout);
                setUndoTimeout(null);
            }
        }
    };
    const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

    return (
        <div className="container mx-auto p-4 text-sm">
            <h1 className='text-2xl font-bold mb-4'>Task Management</h1>
            <p className='text-gray-400'>Manage your tasks here.</p>
            {feedbackMessage && (
                <div className={`px-4 py-3 rounded mb-4 w-1/3 ${deletedTask ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
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
            )}
            {filteredTasks.length != 0 && (<div className="flex gap-3 justify-end mb-4">
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
            </div>)}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-600 p-6 rounded shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
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
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {feedbackMessage && !newTask.id && (
                            <div className="mt-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                {feedbackMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {filteredTasks.length === 0 ? (
                <div className="text-center mt-8">
                    <p className="text-gray-400 mb-4">No tasks available. Create a new task to get started.</p>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create New Task
                    </button>
                </div>
            ) : (
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
                                    <td className="px-4 py-2 text-center">
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
            )}
        </div>
    );
};

export default TaskPage;