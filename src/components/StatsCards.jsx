import React from 'react';
import { Layers, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function StatsCards({ taskCounts }) {
  const completionPercentage = taskCounts.total > 0 
    ? Math.round((taskCounts.completed / taskCounts.total) * 100) 
    : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: taskCounts.total,
      subtitle: 'Across all workflows',
      icon: Layers,
      color: 'stat-total',
      badge: `${taskCounts.total} Active`
    },
    {
      title: 'Completed Tasks',
      value: taskCounts.completed,
      subtitle: `${completionPercentage}% overall completion rate`,
      icon: CheckCircle2,
      color: 'stat-completed',
      badge: `${completionPercentage}%`,
      progress: completionPercentage
    },
    {
      title: 'In Progress',
      value: taskCounts.inProgress,
      subtitle: 'Currently active tasks',
      icon: Clock,
      color: 'stat-progress',
      badge: 'Active Work'
    },
    {
      title: 'Pending Tasks',
      value: taskCounts.pending,
      subtitle: 'Awaiting action',
      icon: AlertCircle,
      color: 'stat-pending',
      badge: 'Backlog'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className={`stat-card ${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                <Icon size={22} />
              </div>
              <span className="stat-badge">{stat.badge}</span>
            </div>

            <div className="stat-body">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-subtitle">{stat.subtitle}</div>
            </div>

            {stat.progress !== undefined && (
              <div className="stat-progress-bar">
                <div 
                  className="stat-progress-fill" 
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Percentage rounding logic
