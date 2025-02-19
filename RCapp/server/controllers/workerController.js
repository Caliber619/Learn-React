const Worker = require('../models/Worker');
const CleaningTask = require('../models/CleaningTask');

// Worker login with ID (simple version without password)
exports.login = async (req, res) => {
  try {
    const { workerId } = req.body;
    
    // Find worker
    const worker = await Worker.findOne({ workerId });
    if (!worker) {
      return res.status(401).json({ message: 'Invalid worker ID' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: worker._id, role: 'worker' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(200).json({
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        workerId: worker.workerId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete task
exports.completeTask = async (req, res) => {
  try {
    const { completionId, workerId } = req.body;
    
    // Find worker
    const worker = await Worker.findOne({ workerId });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    
    // Find task by completion ID
    const task = await CleaningTask.findOne({ completionId, assignedWorker: worker._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not assigned to this worker' });
    }
    
    // Update task status
    task.status = 'completed';
    task.completedAt = new Date();
    await task.save();
    
    res.status(200).json({ message: 'Task completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assigned tasks
exports.getAssignedTasks = async (req, res) => {
  try {
    const workerId = req.user.id;
    
    const tasks = await CleaningTask.find({ 
      assignedWorker: workerId,
      status: { $in: ['assigned'] }
    })
      .populate('student', 'name roomNumber')
      .sort({ preferredTime: 1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};