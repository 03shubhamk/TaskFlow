import React from 'react';
import { Menu, Plus, Calendar, Search } from 'lucide-react';

export default function Header({ 
  currentFilter, 
  onToggleMobileSidebar, 
  onOpenAddTask,
  searchQuery,
  setSearchQuery
}) {
  const getTitle = () => {
    switch (currentFilter) {
      case 'all':
        return 'Dashboard Overview';
      case 'tasks':
        return 'All Tasks Management';
      case 'Pending':
        return 'Pending Tasks';
      case 'In Progress':
        return 'Tasks In Progress';
      case 'Completed':
        return 'Completed Tasks';
      default:
        return 'TaskFlow Dashboard';
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        
        <div>
          <h1 className="header-title">{getTitle()}</h1>
          <div className="header-date">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Quick Header Search */}
        <div className="header-search-wrapper">
          <Search size={16} className="header-search-icon" />
          <input 
            type="text" 
            placeholder="Quick search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </div>

        {/* Primary CTA */}
        <button 
          className="btn btn-primary shadow-btn flex items-center gap-2"
          onClick={onOpenAddTask}
        >
          <Plus size={18} />
          <span className="hidden-mobile">Add Task</span>
        </button>

        {/* User Profile Avatar */}
        <div className="user-avatar" title="TaskFlow Workspace Admin">
          <span>TF</span>
        </div>
      </div>
    </header>
  );
}

// Header date formatter

// Quick search input handler
