const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter schema

const reportSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  cid: { type: String },
  pid: { type: String },
  keyword: { type: String },
  title: { type: String },
  mtitle: { type: String },
  summary: { type: String },
  summary_desc: { type: String },
  toc: { type: String },
  sprice: { type: Number }, // Changed to Number
  mprice: { type: Number }, // Changed to Number
  eprice: { type: Number }, // Changed to Number
  pages: { type: String },
  date: { type: Date, default: Date.now },
  cdate: { type: Date, default: Date.now },
  slug: { type: String },
  created_by: { type: String },
  created_time: { type: Date, default: Date.now },
  updated_by: { type: String },
  updated_time: { type: Date, default: Date.now },
  file: { type: String },
}, {
  collection: 'report',
});

// Pre-save hook to auto-increment 'id'
reportSchema.pre('save', async function (next) {
  const doc = this;
  if (!doc.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'report_id' },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );

    // Debugging log to check the counter value
    console.log('Counter:', counter);

    doc.id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Reports', reportSchema);
