const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: '/img/default-avatar.png'
  },
  bio: {
    type: String,
    default: ''
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  certificates: [{
    type: Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  progress: [{
    type: Schema.Types.ObjectId,
    ref: 'Progress'
  }],
  resetToken: String,
  resetTokenExpiration: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);