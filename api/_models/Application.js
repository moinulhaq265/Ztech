const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    portfolio: { type: String },
    course: { type: String, required: true },
    type: { type: String, enum: ['admission', 'internship'], required: true },
    status: { type: String, enum: ['Pending', 'Interview Scheduled', 'Selected', 'Not Selected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
