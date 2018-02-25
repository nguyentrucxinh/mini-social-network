const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.getUserProfile = async (userId) => {
  const user = await User
    .findById(userId)
    .populate('profile')
    .exec((err, user) => {
      if (err) {
        throw new Error(err)
      }
      return user
    })

  return user
}