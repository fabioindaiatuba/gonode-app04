const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async create(req, res, next) {
    try {

      const corpo = { ...req.body, user: req.userId }
      console.log(corpo);
      const tweet = await Tweet.create(corpo);

      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Tweet.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
