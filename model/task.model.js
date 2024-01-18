const mongoose = require('mongoose');

// Define a schema for the MongoDB collection
const taskSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  task_name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  task_status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  created_by: {
    type: String,
    required: true
  },
  updated_by: {
    type: String
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    }
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    }
  }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
