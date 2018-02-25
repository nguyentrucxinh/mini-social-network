const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../variables.env') })
const fs = require('fs')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, { useMongoClient: true })
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

// Import all of our models - they need to be imported only once
const User = require('../models/User')
const Profile = require('../models/Profile')
const Friend = require('../models/Friend')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

// Password: 123456
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'), 'utf-8'))
const profiles = JSON.parse(fs.readFileSync(path.join(__dirname, '/profiles.json'), 'utf-8'))
const friends = JSON.parse(fs.readFileSync(path.join(__dirname, '/friends.json'), 'utf-8'))
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '/posts.json'), 'utf-8'))
const comments = JSON.parse(fs.readFileSync(path.join(__dirname, '/comments.json'), 'utf-8'))

const deleteData = async () => {
  console.log('😢😢 Goodbye Data...')
  await Comment.remove()
  await Post.remove()
  await Friend.remove()
  await Profile.remove()
  await User.remove()
  console.log('Data Deleted. To load sample data, run\n\n\t npm run seed\n\n')
  process.exit()
}

const loadData = async () => {
  try {
    await User.insertMany(users)
    await Profile.insertMany(profiles)
    await Friend.insertMany(friends)
    await Post.insertMany(posts)
    await Comment.insertMany(comments)
    console.log('👍👍👍👍👍👍👍👍 Done!')
    process.exit()
  } catch (e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run seed:delete\n\n\n')
    console.log(e)
    process.exit()
  }
}

if (process.argv.includes('--delete')) {
  deleteData()
} else {
  loadData()
}
