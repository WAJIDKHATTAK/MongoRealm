const express = require("express");
const RestaurantsController = require("./restaurants.controller");
const ReviewsController = require("./reviews.controller");

const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantByID);
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantsCuisines);

router.route("/reviews")
      .post(ReviewsController.apiAddReview)
      .put(ReviewsController.apiUpdateReview)
      .delete(ReviewsController.apiDeleteReview)

module.exports = router;
