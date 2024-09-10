const express = require('express');
const cors = require('cors'); 
const connectDB = require('./MongoConnection/MongoConnectionProvider'); 
const errorHandler = require('./Middleware/ErrorHandler');  
const issueRoutes = require('./Routes/issueRoute');

const app = express(); 

connectDB(); 

app.use(cors()); 
app.use(express.json()); 

app.use('/api/issues', issueRoutes)

app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
