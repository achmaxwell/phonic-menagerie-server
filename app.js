require('dotenv').config()
const express = require('express')
const { Mongoose } = require('mongoose')
const Schema = Mongoose.Schema
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const auth = require('./controllers/user')
  app.use("/user", user)

  const collection = require('./controllers/collection')
  app.use('/collection', collection)

  const wishlist = require('./controllers/wishlist')
  app.use('/wishlist', wishlist)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()