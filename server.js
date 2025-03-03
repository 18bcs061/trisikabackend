const mongoose = require('mongoose');
const serverless = require('serverless-http');
const app = require('./src/app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to MongoDB before starting the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    
    // Start the server after successful connection
    if (!module.parent) {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports.handler = serverless(app);
