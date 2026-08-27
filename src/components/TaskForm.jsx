import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertCircle, Calendar, Tag } from 'lucide-react';

export default function TaskForm({ isOpen, onClose, onSave, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Development');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'Medium');
      setStatus(taskToEdit.status || 'Pending');
      setDueDate(taskToEdit.dueDate || '');
      setCategory(taskToEdit.category || 'Development');
      setErrors({});
    } else {
      // Set default due date to 3 days from today
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      const defaultDateStr = futureDate.toISOString().split('T')[0];

      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('Pending');
      setDueDate(defaultDateStr);
      setCategory('Development');
      setErrors({});
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!description.trim()) {
      newErrors.description = 'Task description is required.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: taskToEdit ? taskToEdit.id : `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
      category,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString().split('T')[0]
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content card animate-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            className="btn-icon-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., Configure CI/CD Workflow on Render"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: null }));
              }}
              className={`form-input ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea 
              rows="3"
              placeholder="Detailed description of deliverables, objectives, and key requirements..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: null }));
              }}
              className={`form-input ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.description}
              </span>
            )}
          </div>

          {/* Priority & Status Grid */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Workflow Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Category & Due Date Grid */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category / Tag</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="Development">Development</option>
                <option value="DevOps">DevOps</option>
                <option value="UI/UX">UI/UX Design</option>
                <option value="Documentation">Documentation</option>
                <option value="Security">Security</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Due Date <span className="text-rose-400">*</span>
              </label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors(prev => ({ ...prev, dueDate: null }));
                }}
                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
              />
              {errors.dueDate && (
                <span className="error-message">
                  <AlertCircle size={14} />
                  {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-footer mt-6">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary shadow-btn flex items-center gap-2"
            >
              {taskToEdit ? <Save size={18} /> : <Plus size={18} />}
              <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
