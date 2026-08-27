import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle2, Clock, AlertCircle, Tag } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus, viewMode = 'grid' }) {
  // Check if overdue
  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate < todayStr && task.status !== 'Completed';

  // Priority Badge Color Helpers
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-priority-high';
      case 'Medium':
        return 'badge-priority-medium';
      case 'Low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-low';
    }
  };

  // Status Badge Class & Icon Helpers
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed':
        return {
          label: 'Completed',
          badgeClass: 'badge-status-completed',
          icon: CheckCircle2
        };
      case 'In Progress':
        return {
          label: 'In Progress',
          badgeClass: 'badge-status-progress',
          icon: Clock
        };
      case 'Pending':
      default:
        return {
          label: 'Pending',
          badgeClass: 'badge-status-pending',
          icon: AlertCircle
        };
    }
  };

  const statusInfo = getStatusInfo(task.status);
  const StatusIcon = statusInfo.icon;

  if (viewMode === 'list') {
    return (
      <div className={`task-card-list ${task.status === 'Completed' ? 'task-completed' : ''}`}>
        <div className="task-list-left">
          <button 
            className={`status-toggle-btn ${task.status === 'Completed' ? 'checked' : ''}`}
            onClick={() => onToggleStatus(task.id)}
            title={`Mark as ${task.status === 'Completed' ? 'Pending' : 'Completed'}`}
          >
            <CheckCircle2 size={20} />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`task-title ${task.status === 'Completed' ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <p className="task-desc-short">{task.description}</p>
          </div>
        </div>

        <div className="task-list-right">
          <span className={`badge ${statusInfo.badgeClass}`}>
            <StatusIcon size={12} />
            {statusInfo.label}
          </span>

          <div className={`task-date ${isOverdue ? 'text-rose-400 font-semibold' : ''}`}>
            <Calendar size={14} />
            <span>{task.dueDate}</span>
            {isOverdue && <span className="overdue-tag">Overdue</span>}
          </div>

          <div className="task-actions">
            <button 
              className="action-btn edit-btn" 
              onClick={() => onEdit(task)}
              title="Edit Task"
            >
              <Edit3 size={16} />
            </button>
            <button 
              className="action-btn delete-btn" 
              onClick={() => onDelete(task)}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'task-completed' : ''}`}>
      {/* Card Header Badges */}
      <div className="card-top">
        <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority} Priority
        </span>

        <button 
          className={`badge ${statusInfo.badgeClass} interactive-status-badge`}
          onClick={() => onToggleStatus(task.id)}
          title="Click to advance task status"
        >
          <StatusIcon size={12} />
          <span>{statusInfo.label}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="card-body">
        <h3 className={`task-title ${task.status === 'Completed' ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        <p className="task-description">{task.description}</p>
      </div>

      {/* Footer Info & Actions */}
      <div className="card-footer">
        <div className={`task-date ${isOverdue ? 'overdue-date' : ''}`}>
          <Calendar size={14} />
          <span>{task.dueDate}</span>
          {isOverdue && <span className="overdue-chip">Overdue</span>}
        </div>

        <div className="card-action-group">
          <button 
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>

          <button 
            className="action-btn delete-btn"
            onClick={() => onDelete(task)}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Overdue date check
