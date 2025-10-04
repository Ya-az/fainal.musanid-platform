const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // بالثواني
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);