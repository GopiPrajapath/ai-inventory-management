const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://gk9100502017:<db_password>@cluster0-shard-00-00.8n7ro.mongodb.net:27017,cluster0-shard-00-01.8n7ro.mongodb.net:27017,cluster0-shard-00-02.8n7ro.mongodb.net:27017/?replicaSet=atlas-alnv13-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from your Express server!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});