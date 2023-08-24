const app = require("./server");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const RestaurantsDAO = require("./dao/restaurantsDao");
const ReviewsDAO = require("./dao/reviewsDao")
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.ReviewInjectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
