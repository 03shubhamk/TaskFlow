import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, Plus, SearchX } from 'lucide-react';

export default function TaskList({ 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onToggleStatus, 
  viewMode,
  onOpenAddTask,
  onResetFilters,
  isFiltered
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-box">
          {isFiltered ? <SearchX size={40} /> : <ClipboardList size={40} />}
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'No matching tasks found' : 'No tasks created yet'}
        </h3>
        <p className="empty-description">
          {isFiltered 
            ? 'Try adjusting your search criteria or clearing filters to view all tasks.'
            : 'Get started by creating your first task to organize your workspace workflow.'}
        </p>
        
        <div className="empty-actions mt-4">
          {isFiltered ? (
            <button className="btn btn-secondary" onClick={onResetFilters}>
              Reset Filters
            </button>
          ) : (
            <button className="btn btn-primary shadow-btn" onClick={onOpenAddTask}>
              <Plus size={18} />
              <span>Create First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'tasks-grid' : 'tasks-list-container'}>
      {tasks.map(task => (
        <TaskCard 
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleStatus={onToggleStatus}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

// Empty search results state
