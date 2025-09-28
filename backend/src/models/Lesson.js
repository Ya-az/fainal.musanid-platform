const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 0 // بالدقائق
  },
  videoUrl: String,
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  quiz: {
    questions: [{
      text: String,
      options: [String],
      correctOption: Number
    }],
    passingScore: {
      type: Number,
      default: 70
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);