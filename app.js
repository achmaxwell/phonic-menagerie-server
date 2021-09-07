require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const collection = require('./controllers/Collection')
  app.use('/collection', collection)

  const wishlist = require('./controllers/wishlist')
  app.use('/wishlist', wishlist)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()