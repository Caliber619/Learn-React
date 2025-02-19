const Student = require('../models/Student');
const CleaningTask = require('../models/CleaningTask');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register student
exports.register = async (req, res) => {
  try {
    const { name, email, roomNumber, password } = req.body;
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new student
    const student = new Student({
      name,
      email,
      roomNumber,
      password: hashedPassword
    });
    
    await student.save();
    
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login student
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find student
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(200).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        roomNumber: student.roomNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create cleaning request
exports.createCleaningRequest = async (req, res) => {
  try {
    const { preferredTime, notes } = req.body;
    const studentId = req.user.id;
    
    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Create cleaning task
    const cleaningTask = new CleaningTask({
      student: studentId,
      roomNumber: student.roomNumber,
      requestTime: new Date(),
      preferredTime: new Date(preferredTime),
      notes
    });
    
    await cleaningTask.save();
    
    res.status(201).json({
      message: 'Cleaning request created successfully',
      token: cleaningTask.token,
      completionId: cleaningTask.completionId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student cleaning requests
exports.getCleaningRequests = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const tasks = await CleaningTask.find({ student: studentId })
      .populate('assignedWorker', 'name workerId')
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};