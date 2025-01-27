"use client"
import { useState } from 'react';
import Modal from '@/components/Modal';
import FeedbackMessage from './feedback-message';
import { Task } from '../lib/interface';
import TaskNotFound from './task-not-found';
import TaskList from './task-list';


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

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewTask({ id: undefined, title: '', description: '', status: 'To Do' });
    }
    const handleCreateNew = () => {
        setFeedbackMessage(null);
        setNewTask({ id: undefined, title: '', description: '', status: 'To Do' });
        setIsModalOpen(true);

    }
    const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

    return (
        <div className="container mx-auto p-4 text-sm">
            <h1 className='text-2xl font-bold mb-4'>Task Management</h1>
            <p className='text-gray-400'>Manage your tasks here.</p>
            {feedbackMessage && (
                <FeedbackMessage size='large' feedbackMessage={feedbackMessage} undoDelete={undoDelete} deletedTask={deletedTask} />
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

            <Modal isOpen={isModalOpen} onClose={handleCancel}>

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
                {feedbackMessage && !newTask.id && (
                    <FeedbackMessage feedbackMessage={feedbackMessage}  />
                )}
            </Modal>

            {filteredTasks.length === 0 ? (
               <TaskNotFound onCreateNew={handleCreateNew} />
            ) : (
                <TaskList filteredTasks={filteredTasks} handleEditTask={handleEditTask} deleteTask={deleteTask} />
            )}
        </div>
    );
};

export default TaskPage;