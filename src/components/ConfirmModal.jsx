import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content confirm-modal-card animate-modal">
        <div className="confirm-icon-box">
          <AlertTriangle size={28} className="text-rose-400" />
        </div>

        <h3 className="confirm-title">Delete Task Confirmation</h3>
        
        <p className="confirm-text">
          Are you sure you want to delete <strong className="text-slate-200">"{taskTitle}"</strong>? 
          This action will permanently remove it from LocalStorage and cannot be undone.
        </p>

        <div className="modal-footer mt-6 flex justify-center gap-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger flex items-center gap-2" onClick={onConfirm}>
            <Trash2 size={16} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Backdrop blur overlay
