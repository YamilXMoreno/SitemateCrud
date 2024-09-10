const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      dbName: 'IssuesForumCrud',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to IssuesForumCrud database'); 
  } catch (err) {
    console.error('MongoDB connection error:', err.message); 
    process.exit(1); 
  }
};

module.exports = connectDB; 
