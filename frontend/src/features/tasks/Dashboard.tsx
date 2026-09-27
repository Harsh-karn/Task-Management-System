import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { Task } from '../../types';
import TaskForm from './TaskForm';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const response = await api.put(`/tasks/${task.id}`, { status: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await api.post('/auth/logout', { refreshToken });
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>My Tasks</h1>
        <button onClick={handleLogout} className="secondary-btn">Logout</button>
      </header>
      
      <div className="dashboard-actions">
        <button onClick={() => { setEditingTask(null); setShowForm(true); }} className="primary-btn">
          Add New Task
        </button>
      </div>

      {showForm && (
        <TaskForm 
          task={editingTask} 
          onClose={() => setShowForm(false)} 
          onSuccess={() => { setShowForm(false); fetchTasks(); }} 
        />
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks found. Create one to get started!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p className="task-description">{task.description}</p>}
                {task.due_date && <p className="task-due-date">Due: {new Date(task.due_date).toLocaleDateString()}</p>}
                <span className={`status-badge ${task.status}`}>{task.status}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleToggleStatus(task)} className="action-btn">
                  {task.status === 'completed' ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => { setEditingTask(task); setShowForm(true); }} className="action-btn edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(task.id)} className="action-btn delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
