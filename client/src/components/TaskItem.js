import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = (e) => {
    onStatusChange(task._id, e.target.value);
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button className="edit-btn" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="task-badges">
          <span className={`badge status-${task.status}`}>
            {task.status.replace("-", " ").toUpperCase()}
          </span>
          <span className={`badge priority-${task.priority}`}>
            {task.priority.toUpperCase()} PRIORITY
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            className="status-select"
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <small style={{ color: "#666" }}>
            Created: {formatDate(task.createdAt)}
          </small>

          {task.status === "completed" && task.completedAt && (
            <small style={{ color: "#228822", marginLeft: "10px" }}>
              Completed: {formatDate(task.completedAt)}
            </small>
          )}

          {task.dueDate && task.status !== "completed" && (
            <small style={{ color: "#b33" }}>
              Due: {formatDate(task.dueDate)}
            </small>
          )}

          {task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== "completed" && (
              <small style={{ color: "red", fontWeight: "bold" }}>
                Overdue!
              </small>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
