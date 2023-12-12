const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('Email already exists');

    user = new User({ email, password });
    await user.save();
    res.status(201).send({ email: user.email });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid Credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid Credentials');

    const token = jwt.sign({ userId: user.id }, 'KHjdJHVKxyjfkGJKVLHMJL', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.route('/:user_id')

router.get('/:user_id', async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id).select('-password');
      if (!user) return res.status(404).send('User not found');
  
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  router.put('/:user_id', async (req, res) => {
    try {
      const { email, role } = req.body;
      let user = await User.findById(req.params.user_id);
  
      if (!user) return res.status(404).send('User not found');
  
      if (email) user.email = email;
      if (role !== undefined) user.role = role;
  
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  router.delete('/:user_id', async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
  
      if (!user) return res.status(404).send('User not found');
  
      await user.remove();
      res.json({ msg: 'User deleted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;
