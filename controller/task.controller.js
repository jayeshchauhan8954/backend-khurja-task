const Task = require('../model/task.model');
const User = require('../model/user.model');
/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTask = async (req, res) => {
  const userEmail = req.user.email;
  try {
    const { task_name, description, task_status, priority, created_by, updated_by } = req.body;

    // Check if user email is provided
    if (!userEmail) {
      return res.status(400).send({ error: 'User email is required to create a task' });
    }

    // Find the user by email
    let existingUser = await User.findOne({ email: userEmail });

    // Check if the user exists
    if (!existingUser) {
      return res.status(400).send({ error: 'User email is not valid to create a task' });
    }

    // If the user exists, create a new task
    const task = new Task({
      task_name,
      description,
      task_status,
      priority,
      created_by,
      updated_by,
      user: userEmail,
    });

    // Save the task to the database
    await task.save();

    // Send a success response
    res.status(201).send({ message: 'Task created successfully', data: task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};



const getAllTasks = async (req, res) => {
  let userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res.status(400).send({ error: 'User email is required to gel all tasks' });
    }
    let existingUser = await User.findOne({ email: userEmail });
    if (!existingUser) {
      return res.status(400).send({ error: 'User email is not valid to create a task' });
    }

    const tasks = await Task.find({ user: userEmail });
    res.send({ message: 'Tasks retrieved successfully', data: tasks });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve tasks', message: error.message });
  }
};

const getTaskById = async (req, res) => {
  let userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res.status(400).send({ error: 'User email is required to get a task' });
    }
    let existingUser = await User.findOne({ email: userEmail });

    // Check if the user exists
    if (!existingUser) {
      return res.status(400).send({ error: 'User email is not valid to create a task' });
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send({ message: 'Task retrieved successfully', data: task });
  } catch (error) {
    // console.error('Error retrieving task:', error);
    res.status(500).send({ error: 'Failed to retrieve task', message: error.message });
  }
};

const updateTaskById = async (req, res) => {
  let userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res.status(400).send({ error: 'User email is required to get a task' });
    }
    let existingUser = await User.findOne({ email: userEmail });

    // Check if the user exists
    if (!existingUser) {
      return res.status(400).send({ error: 'User email is not valid to create a task' });
    }
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).send({ error: 'Task not found' });
    }
    const { task_name, description, task_status, priority, updated_by } = req.body;

    if ((!task_name || !description || !task_status || !priority) && !updated_by) {
      return res.status(400).send({ error: 'No fields provided for update' });
    }

    let updatedFields = {};

    if (task_name) updatedFields.task_name = task_name || existingTask.task_name;
    if (description) updatedFields.description = description || existingTask.description;
    if (task_status) updatedFields.task_status = task_status || existingTask.task_status;
    if (priority) updatedFields.priority = priority || existingTask.priority;
    if (updated_by) updatedFields.updated_by = updated_by || existingTask.updated_by;

    const task = await Task.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.send({ message: 'Task updated successfully', data: task });
  } catch (error) {
    res.status(400).send({ error: 'Failed to update task', message: error.message });
  }
};



const deleteTaskById = async (req, res) => {
  let userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res.status(400).send({ error: 'User email is required to get a task' });
    }
    let existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return res.status(400).send({ error: 'User email is not valid to create a task' });
    }
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.send({ message: 'Task deleted successfully', data: task });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task', message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
