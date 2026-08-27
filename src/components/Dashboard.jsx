import React from 'react';
import StatsCards from './StatsCards';
import TaskCard from './TaskCard';
import { 
  Plus, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  BarChart3, 
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function Dashboard({ 
  tasks, 
  taskCounts, 
  onOpenAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleStatus,
  onNavigateToTasks
}) {
  // Filter high priority or upcoming tasks for quick view
  const urgentTasks = tasks
    .filter(t => t.priority === 'High' && t.status !== 'Completed')
    .slice(0, 4);

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt || b.dueDate) - new Date(a.createdAt || a.dueDate))
    .slice(0, 4);

  // Calculate Priority Distribution
  const highCount = tasks.filter(t => t.priority === 'High').length;
  const medCount = tasks.filter(t => t.priority === 'Medium').length;
  const lowCount = tasks.filter(t => t.priority === 'Low').length;
  const total = tasks.length || 1;

  const highPercent = Math.round((highCount / total) * 100);
  const medPercent = Math.round((medCount / total) * 100);
  const lowPercent = Math.round((lowCount / total) * 100);

  return (
    <div className="dashboard-view">
      {/* Top Metrics Cards */}
      <StatsCards taskCounts={taskCounts} />

      {/* Dashboard Grid Row */}
      <div className="dashboard-grid mt-6">
        {/* Priority Distribution Widget */}
        <div className="card dashboard-widget">
          <div className="widget-header">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-indigo-400" size={20} />
              <h3 className="widget-title">Priority Breakdown</h3>
            </div>
            <span className="text-xs text-slate-400">{tasks.length} total tasks</span>
          </div>

          <div className="widget-body">
            <div className="priority-bars mt-2">
              <div className="priority-item">
                <div className="priority-info">
                  <span className="priority-label flex items-center gap-1.5">
                    <span className="dot dot-high"></span> High Priority
                  </span>
                  <span className="priority-val">{highCount} ({highPercent}%)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-high" style={{ width: `${highPercent}%` }}></div>
                </div>
              </div>

              <div className="priority-item">
                <div className="priority-info">
                  <span className="priority-label flex items-center gap-1.5">
                    <span className="dot dot-medium"></span> Medium Priority
                  </span>
                  <span className="priority-val">{medCount} ({medPercent}%)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-medium" style={{ width: `${medPercent}%` }}></div>
                </div>
              </div>

              <div className="priority-item">
                <div className="priority-info">
                  <span className="priority-label flex items-center gap-1.5">
                    <span className="dot dot-low"></span> Low Priority
                  </span>
                  <span className="priority-val">{lowCount} ({lowPercent}%)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-low" style={{ width: `${lowPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="dashboard-cta-banner mt-6">
              <div className="banner-icon">
                <Sparkles size={20} className="text-indigo-400" />
              </div>
              <div className="banner-text">
                <div className="font-semibold text-slate-200 text-sm">TaskFLOW Productivity Tip</div>
                <div className="text-xs text-slate-400">Complete high priority items first to boost team efficiency!</div>
              </div>
            </div>
          </div>
        </div>

        {/* High Priority / Action Needed Card */}
        <div className="card dashboard-widget">
          <div className="widget-header">
            <div className="flex items-center gap-2">
              <Flame className="text-rose-400" size={20} />
              <h3 className="widget-title">High Priority Action Items</h3>
            </div>
            <button 
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              onClick={() => onNavigateToTasks('tasks')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="widget-body">
            {urgentTasks.length === 0 ? (
              <div className="empty-widget-state">
                <CheckCircle size={32} className="text-emerald-400 mb-2" />
                <p className="text-sm font-medium text-slate-300">All high priority tasks cleared!</p>
                <p className="text-xs text-slate-500">You're all caught up with urgent tasks.</p>
              </div>
            ) : (
              <div className="urgent-list">
                {urgentTasks.map(task => (
                  <div key={task.id} className="urgent-item">
                    <div className="urgent-left">
                      <button 
                        className={`status-circle status-${task.status.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => onToggleStatus(task.id)}
                        title="Toggle completion"
                      />
                      <div>
                        <div className="urgent-title">{task.title}</div>
                        <div className="urgent-meta">
                          <span className="badge-due">Due {task.dueDate}</span>
                          <span className="badge-cat">{task.category || 'General'}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="btn-icon-sm"
                      onClick={() => onEditTask(task)}
                      title="Edit Task"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Tasks List Preview */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading">Recently Created & Active Tasks</h2>
          <button 
            className="btn btn-secondary text-sm flex items-center gap-1.5"
            onClick={() => onNavigateToTasks('tasks')}
          >
            <span>Browse All Tasks</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="tasks-grid">
          {recentTasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Priority calculation helper

// Urgent action items filter

// Banner tip widget

// View all tasks button
