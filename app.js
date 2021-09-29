// require("dotenv").config();
// const express = require("express");
// const app = express();
const port = 3000

// ;(async() => {
//   app.use(express.json())

//   const headers = require('./middleware/headers')
//   app.use("/headers", headers);

//   const userController = require('./controllers/usercontroller')
//   app.use("/user", userController)

//   const collectionController = require('./controllers/collectioncontroller')
//   app.use('/collection', collectionController)

//   const wishListController = require('./controllers/wishlistcontroller')
//   app.use('/wishlist', wishListController)

//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })
// })()

require("dotenv").config();
const Express = require("express");
const app = Express();
const { sequelize } = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

app.use("/collection", controllers.collectionController);

app.use("/wishlist", controllers.wishlistController);
app.listen(port, () => {
    console.log(`[Server]: App is listening on 3000.`);
});
