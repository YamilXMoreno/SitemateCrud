const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueId: {
        type: Number,
        required: true,
        unique: true,
        index: true,  
      },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Issue = mongoose.model('Issues', issueSchema);

module.exports = Issue;
