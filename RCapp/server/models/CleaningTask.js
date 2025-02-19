const mongoose = require('mongoose');

const cleaningTaskSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  requestTime: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'assigned', 'completed', 'cancelled'],
    default: 'requested'
  },
  token: {
    type: String,
    unique: true
  },
  completionId: {
    type: String,
    unique: true
  },
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  completedAt: Date,
  notes: String
}, { timestamps: true });

// Generate token and completion ID before saving
cleaningTaskSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  // Generate token (TK followed by 6 random alphanumeric characters)
  this.token = 'TK' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // Generate completion ID (4-digit number)
  this.completionId = Math.floor(1000 + Math.random() * 9000).toString();
  
  next();
});

module.exports = mongoose.model('CleaningTask', cleaningTaskSchema);