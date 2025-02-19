const Manager = require('../models/Manager');
const Worker = require('../models/Worker');
const CleaningTask = require('../models/CleaningTask');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register manager
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if manager already exists
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Manager already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new manager
    const manager = new Manager({
      name,
      email,
      password: hashedPassword
    });
    
    await manager.save();
    
    res.status(201).json({ message: 'Manager registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login manager
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find manager
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: manager._id, role: 'manager' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(200).json({
      token,
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new worker
exports.addWorker = async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    // Create new worker
    const worker = new Worker({
      name,
      phone
    });
    
    await worker.save();
    
    res.status(201).json({
      message: 'Worker added successfully',
      worker: {
        id: worker._id,
        name: worker.name,
        workerId: worker.workerId,
        phone: worker.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all workers
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().select('-__v');
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cleaning tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await CleaningTask.find()
      .populate('student', 'name roomNumber')
      .populate('assignedWorker', 'name workerId')
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign task to worker
exports.assignTask = async (req, res) => {
  try {
    const { taskId, workerId } = req.body;
    
    // Find worker
    const worker = await Worker.findOne({ workerId });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    
    // Find task
    const task = await CleaningTask.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.status !== 'requested') {
      return res.status(400).json({ message: 'Task is already assigned or completed' });
    }
    
    // Update task
    task.assignedWorker = worker._id;
    task.status = 'assigned';
    await task.save();
    
    // Update worker's assigned tasks
    worker.assignedTasks.push(task._id);
    await worker.save();
    
    res.status(200).json({ message: 'Task assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};