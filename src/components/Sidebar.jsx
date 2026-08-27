import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListTodo, 
  Plus, 
  Sparkles,
  X,
  Layers
} from 'lucide-react';

export default function Sidebar({ 
  currentFilter, 
  setCurrentFilter, 
  taskCounts, 
  onOpenAddTask, 
  isOpen, 
  onCloseMobile 
}) {
  const navItems = [
    { 
      id: 'all', 
      label: 'Dashboard Overview', 
      icon: LayoutDashboard, 
      count: taskCounts.total, 
      color: 'text-indigo-400' 
    },
    { 
      id: 'tasks', 
      label: 'All Tasks', 
      icon: ListTodo, 
      count: taskCounts.total, 
      color: 'text-blue-400' 
    },
    { 
      id: 'Pending', 
      label: 'Pending Tasks', 
      icon: AlertCircle, 
      count: taskCounts.pending, 
      color: 'text-amber-400' 
    },
    { 
      id: 'In Progress', 
      label: 'In Progress', 
      icon: Clock, 
      count: taskCounts.inProgress, 
      color: 'text-violet-400' 
    },
    { 
      id: 'Completed', 
      label: 'Completed Tasks', 
      icon: CheckCircle2, 
      count: taskCounts.completed, 
      color: 'text-emerald-400' 
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="mobile-overlay" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Header / Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <Layers className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskFlow</span>
            <span className="brand-tag">v1.0 Pro</span>
          </div>
          <button 
            className="mobile-close-btn"
            onClick={onCloseMobile}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action CTA */}
        <div className="sidebar-cta-box">
          <button 
            className="btn btn-primary btn-block shadow-btn"
            onClick={() => {
              onOpenAddTask();
              onCloseMobile();
            }}
          >
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">Views & Filters</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentFilter === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentFilter(item.id);
                  onCloseMobile();
                }}
              >
                <div className="nav-item-left">
                  <Icon size={18} className={`nav-icon ${item.color}`} />
                  <span className="nav-label">{item.label}</span>
                </div>
                <span className={`nav-badge ${isActive ? 'nav-badge-active' : ''}`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer / CI/CD Deployment Info Badge */}
        <div className="sidebar-footer">
          <div className="deployment-card">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Deployment Status</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ready for GitHub Actions & Render CI/CD pipeline.
            </p>
            <div className="badge-ready mt-2">
              <span className="pulse-dot"></span> CI/CD Production Ready
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Sidebar active item indicator
