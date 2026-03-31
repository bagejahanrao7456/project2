const express =  require("express");
const router=  express.Router({ mergeParams: true });

const wrapAsync=  require("../utils/wrapasync.js");
const {validateReview, isLoggedIn,isReview } = require("../views/middleware.js");
const reviewController = require("../controllers/reviews.js");

const ExpressError=  require("../utils/ExpressError.js");

// const {reviewSchema}=  require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const { createReview } = require("../controllers/reviews");


// const reviewController=  require("../controllers/reviews.js");
// // const { destroyListing } = require("../controllers/listings.js");
// const reviewController = require("../controllers/reviews.js")

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview)

  );

// router.post("/listings/:id/reviews", isLoggedIn, validateReview, wrapAsync(createReview));
  
  router.delete("/:reviewId",isLoggedIn,isReview, wrapAsync(reviewController.destroyReview));
  
  module.exports= router;
