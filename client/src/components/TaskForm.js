import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  // Declare helper function here, inside component but before useEffect
  const toLocalDateTime = (isoString) => {
    if (!isoString) return '';
    const dt = new Date(isoString);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '' // ✅ add this
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
       dueDate: toLocalDateTime(editingTask.dueDate)// ✅ for datetime-local format
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    
    if (!editingTask) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '' // ✅ reset this too      
    });
  }
  };

  return (
    <div className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Task title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description (optional)..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <select
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="datetime-local"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          
          <div 
  className="form-group" 
  style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
>
  <button type="submit" className="btn btn-primary">
    {editingTask ? 'Update' : 'Add Task'}
  </button>
  {editingTask && (
    <button 
      type="button" 
      className="btn btn-secondary"
      onClick={onCancel}
    >
      Cancel
    </button>
  )}
</div>

        </div>
      </form>
    </div>
  );
};

export default TaskForm;
