const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const timerRoutes = require('./routes/timer');

const app = express();

app.use(express.json());

// Connectez-vous à votre base de données avec mongoose.connect()

app.use('/users', userRoutes);
app.use('/timer', timerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
