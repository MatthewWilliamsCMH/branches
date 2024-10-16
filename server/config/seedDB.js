const DB = require('./connection')
const {User} = require('../models')
const cleanDB = require('./cleanDB')


DB.once('open', async () => {
  await cleanDB('User', 'users')

  await User.create({
    name:'mike',
    email:'noah.carter@fastmail.com',
    password: '!passworD1'
  })
  console.log('user seeded')
  process.exit()
})