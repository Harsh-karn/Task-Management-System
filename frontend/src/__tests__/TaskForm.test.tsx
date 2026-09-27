import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskForm from '../features/tasks/TaskForm';

describe('TaskForm Component', () => {
  it('renders "Add New Task" title when no task is provided', () => {
    render(
      <TaskForm 
        task={null} 
        onClose={() => {}} 
        onSuccess={() => {}} 
      />
    );
    
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByText(/Title \*/i)).toBeInTheDocument();
  });

  it('renders "Edit Task" and pre-fills data when a task is provided', () => {
    const mockTask = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      category: 'Work',
      due_date: '2026-10-01T00:00:00.000Z',
      user_id: 1,
      created_at: '2026-09-01',
      updated_at: '2026-09-01'
    };

    render(
      <TaskForm 
        task={mockTask} 
        onClose={() => {}} 
        onSuccess={() => {}} 
      />
    );
    
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });
});
