import React from 'react';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, RotateCcw } from 'lucide-react';

export default function SearchFilter({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter, 
  priorityFilter, 
  setPriorityFilter, 
  sortBy, 
  setSortBy,
  viewMode,
  setViewMode,
  onResetFilters,
  totalResults
}) {
  const isFiltered = searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="search-filter-card">
      <div className="filter-top-row">
        {/* Search Input Box */}
        <div className="search-box-large">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            placeholder="Search tasks by title, description or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        {/* View Mode Toggle Switch */}
        <div className="view-mode-toggle">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="filter-bottom-row">
        {/* Status Quick Filter Pills */}
        <div className="status-pills">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'Pending', label: 'Pending' },
            { id: 'In Progress', label: 'In Progress' },
            { id: 'Completed', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`pill-btn ${statusFilter === tab.id ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority & Sort Dropdowns */}
        <div className="filter-dropdowns">
          <div className="dropdown-wrapper">
            <Filter size={14} className="dropdown-icon" />
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="dropdown-wrapper">
            <ArrowUpDown size={14} className="dropdown-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="dueDate">Sort by: Due Date</option>
              <option value="priority">Sort by: Priority</option>
              <option value="title">Sort by: Title</option>
              <option value="createdAt">Sort by: Created Date</option>
            </select>
          </div>

          {isFiltered && (
            <button 
              className="reset-filters-btn"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Filter reset handler

// View mode switch

// Clear search button
