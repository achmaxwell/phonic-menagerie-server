require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000

;(async() => {
  app.use(express.json())

  const headers = require('./middleware/headers')
  app.use("/headers", headers);

  const userController = require('./controllers/usercontroller')
  app.use("/user", userController)

  const collectionController = require('./controllers/collectioncontroller')
  app.use('/collection', collectionController)

  const wishListController = require('./controllers/wishlistcontroller')
  app.use('/wishlist', wishListController)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()

// app.use(require('./middleware/headers'));


// const controllers = require("./controllers");

// app.use(express.json());

// app.use("/user", controllers.userController);
// app.use(require("./middleware/validate-jwt"));


// db.authenticate()
//   .then(() => db.sync({force: true})) // => {force: true} this means delete databases
//   .then(() => {
//     app.listen(process.env.DB_PORT, () =>
//       console.log(`[Server: ] App is listening on Port ${port}`)
//     );
//   })
//   .catch((err) => {
//     console.log(`[Server: ] Server Crashed: ${err}`);
//     console.error(err);
//   });
