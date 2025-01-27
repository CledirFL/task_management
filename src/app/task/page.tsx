"use client"
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import FeedbackMessage from './feedback-message';
import { Task } from '../lib/interface';
import TaskNotFound from './task-not-found';
import TaskList from './task-list';
import TaskForm from './task-form';
import TaskFilter from './task-filter';


const sampleTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description for task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description for task 3', status: 'Done' },
    { id: 4, title: 'Task 4', description: 'Description for task 4', status: 'To Do' },
    { id: 5, title: 'Task 5', description: 'Description for task 5', status: 'In Progress' }
];

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState<Task>({ title: '', description: '', status: 'To Do' });
    const [filter, setFilter] = useState<'All' | 'To Do' | 'In Progress' | 'Done'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [deletedTask, setDeletedTask] = useState<Task | null>(null);
    const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        setTasks([...tasks, { ...newTask, id: Date.now() }]);
        setNewTask({ title: '', description: '', status: 'To Do' });
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

    // open modal with task data
    const handleEditTask = (task: Task) => {
        setNewTask(task);
        setIsModalOpen(true);
    }

    // delete task with time to undo the action
    const deleteTask = (id: number) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (taskToDelete) {
            setDeletedTask(taskToDelete);
            setTasks(tasks.filter(task => task.id !== id));
            setFeedbackMessage('Task deleted. Undo?');
            const timeout = setTimeout(() => {
                setDeletedTask(null);
                setFeedbackMessage(null);
            }, 10000);
            setUndoTimeout(timeout);
        }
    };

    // undo delete task
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

    // close modal and set new task to empty
    const handleCancel = () => {
        setIsModalOpen(false);
        setNewTask({ id: undefined, title: '', description: '', status: 'To Do' });
    }
    // open modal with empty task
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
            {feedbackMessage &&
                <FeedbackMessage size='large' feedbackMessage={feedbackMessage} undoDelete={undoDelete} deletedTask={deletedTask} />
            }

            {filteredTasks.length != 0 && <TaskFilter filter={filter} setFilter={setFilter} setIsModalOpen={setIsModalOpen} />}

            <Modal isOpen={isModalOpen} onClose={handleCancel}>

                <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} editTask={editTask} handleCancel={handleCancel} />
                {feedbackMessage && !newTask.id && (
                    <FeedbackMessage feedbackMessage={feedbackMessage} />
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