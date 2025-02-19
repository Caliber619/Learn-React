const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  workerId: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  assignedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CleaningTask'
  }]
}, { timestamps: true });

// Generate worker ID before saving
workerSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  const count = await this.constructor.countDocuments();
  this.workerId = `W${(count + 1).toString().padStart(3, '0')}`;
  next();
});

module.exports = mongoose.model('Worker', workerSchema);