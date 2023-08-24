const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;

let reviews;

const ReviewInjectDB = async (conn) => {
  if (reviews) {
    return;
  }
  try {
    reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
  } catch (e) {
    console.error(`Unable to establish collection handles in userDAO: ${e}`);
  }
};

const addReview = async (restaurantId, user, review, date) => {
    try {
        const reviewDoc = { name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            restaurant_id: ObjectId(restaurantId), }
  
        return await reviews.insertOne(reviewDoc)
      } catch (e) {
        console.error(`Unable to post review: ${e}`)
        return { error: e }
      }
}

const updateReview = async (reviewId, userId, text, date) => {
    try {
        const updateResponse = await reviews.updateOne(
          { user_id: userId, _id: ObjectId(reviewId)},
          { $set: { text: text, date: date  } },
        )
  
        return updateResponse
      } catch (e) {
        console.error(`Unable to update review: ${e}`)
        return { error: e }
      }
}

const deleteReview =  async (reviewId, userId) => {
    try {
        const deleteResponse = await reviews.deleteOne({
          _id: ObjectId(reviewId),
          user_id: userId,
        })
  
        return deleteResponse
      } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return { error: e }
      }
    }

module.exports = {
    ReviewInjectDB,
    addReview,
    updateReview,
    deleteReview
}
