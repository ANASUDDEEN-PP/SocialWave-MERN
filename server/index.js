const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

//import Models
const userModel = require('./models/newUser');


//mongoDB Connection
mongoose.connect('mongodb://localhost:27017/demo-app');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});


// save the register data
app.post('/register', (req, res) => {
  const newUser ={
    username : req.body.username,
    phone : req.body.phone,
    email : req.body.email,
    password : req.body.password
  }

  userModel.create(newUser)
  .then(newUser =>{
    console.log('new user added to your DB', newUser);
    res.status(200).json({ message: 'User registered successfully' });
  })
  .catch(err => {
    console.error('Error creating a new user', err);
    res.status(500).json({ error: 'An error occurred while creating a user' });
  });
});

//login API
app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const isPasswordValid = await userModel.findOne({ password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }


    if (isPasswordValid) {
      res.json({ message: 'Login Successfully' });
      console.log('login successfully')
    } else {
      res.json({ message: 'Invalid username or password' });
      console.log('invalid password');
    }
  } catch (error) {
    console.log('Something went wrong', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// user data fetching
app.get('/api/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      // Send the user data to the client
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//port address details
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});