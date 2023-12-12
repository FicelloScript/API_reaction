const express = require('express');
const router = express.Router();
const Timer = require('../models/Timer');
const User = require('../models/User');

const auth = require('src/middleware/auth');

router.post('/:user_id/timer', auth, async (req, res) => {
  try {
    const { time } = req.body;
    const user_id = req.params.user_id;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const newTimer = new Timer({
      user_id,
      time
    });

    await newTimer.save();
    res.status(201).json(newTimer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/:user_id/timer', auth, async (req, res) => {
  try {
    const timers = await Timer.find({ user_id: req.params.user_id });
    res.json(timers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
