import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SAMPLE_TASKS } from './utils/sampleData';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SearchFilter from './components/SearchFilter';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  // LocalStorage state persistence
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks_v1', SAMPLE_TASKS);

  // Navigation & Filtering state
  const [currentFilter, setCurrentFilter] = useState('all'); // 'all' (Dashboard), 'tasks', 'Pending', 'In Progress', 'Completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [viewMode, setViewMode] = useState('grid');

  // UI Drawer & Modals state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Synchronize sidebar filter with status filter when sidebar item clicked
  const handleNavFilterChange = (filterId) => {
    setCurrentFilter(filterId);
    if (filterId === 'all' || filterId === 'tasks') {
      setStatusFilter('all');
    } else {
      setStatusFilter(filterId);
    }
  };

  // Task Counts Calculation
  const taskCounts = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      pending: tasks.filter(t => t.status === 'Pending').length
    };
  }, [tasks]);

  // Filter & Sort Logic
  const filteredAndSortedTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search query filter (title, description, category)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        (task.category && task.category.toLowerCase().includes(query));

      // Status Filter
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      // Priority Filter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    }).sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'priority') {
        const priorityMap = { High: 1, Medium: 2, Low: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      return 0;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  // CRUD Operations
  const handleSaveTask = (savedTask) => {
    if (taskToEdit) {
      // Update existing task
      setTasks(prev => prev.map(t => t.id === savedTask.id ? savedTask : t));
    } else {
      // Create new task
      setTasks(prev => [savedTask, ...prev]);
    }
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // Cycle status: Pending -> In Progress -> Completed -> Pending
        let nextStatus = 'In Progress';
        if (t.status === 'In Progress') nextStatus = 'Completed';
        else if (t.status === 'Completed') nextStatus = 'Pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('dueDate');
  };

  const isFiltered = searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentFilter={currentFilter}
        setCurrentFilter={handleNavFilterChange}
        taskCounts={taskCounts}
        onOpenAddTask={() => {
          setTaskToEdit(null);
          setIsTaskModalOpen(true);
        }}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header 
          currentFilter={currentFilter}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenAddTask={() => {
            setTaskToEdit(null);
            setIsTaskModalOpen(true);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="main-content">
          {currentFilter === 'all' ? (
            /* Dashboard View */
            <Dashboard 
              tasks={tasks}
              taskCounts={taskCounts}
              onOpenAddTask={() => {
                setTaskToEdit(null);
                setIsTaskModalOpen(true);
              }}
              onEditTask={(task) => {
                setTaskToEdit(task);
                setIsTaskModalOpen(true);
              }}
              onDeleteTask={(task) => {
                setTaskToDelete(task);
                setIsDeleteModalOpen(true);
              }}
              onToggleStatus={handleToggleStatus}
              onNavigateToTasks={(filterId) => handleNavFilterChange(filterId)}
            />
          ) : (
            /* All Tasks / Filtered Tasks View */
            <div className="tasks-management-view">
              <SearchFilter 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onResetFilters={handleResetFilters}
                totalResults={filteredAndSortedTasks.length}
              />

              <TaskList 
                tasks={filteredAndSortedTasks}
                onEditTask={(task) => {
                  setTaskToEdit(task);
                  setIsTaskModalOpen(true);
                }}
                onDeleteTask={(task) => {
                  setTaskToDelete(task);
                  setIsDeleteModalOpen(true);
                }}
                onToggleStatus={handleToggleStatus}
                viewMode={viewMode}
                onOpenAddTask={() => {
                  setTaskToEdit(null);
                  setIsTaskModalOpen(true);
                }}
                onResetFilters={handleResetFilters}
                isFiltered={isFiltered}
              />
            </div>
          )}
        </main>
      </div>

      {/* Task Modal (Add/Edit) */}
      <TaskForm 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete ? taskToDelete.title : ''}
      />
    </div>
  );
}

// Status cycle helper

// Sort comparator

// Mobile drawer toggle state

// Task counts memoization
