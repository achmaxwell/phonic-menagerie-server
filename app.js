require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const vinyl = require('./controllers/Vinyl')
  app.use('/vinyl', vinyl)

  const cd = require('./controllers/CD')
  app.use('/cd', cd)

  const cassette = require('./controllers/cassette')
  app.use('/cassette', cassette)

  const wishlist = require('./controllers/wishlist')
  app.use('/wishlist', wishlist)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()