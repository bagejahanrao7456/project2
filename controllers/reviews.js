
const Listing= require("../models/listing");
const Review= require("../models/review");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

module.exports.createReview= async(req,res,next)=>{

    console.log(req.params.id);

    if (!req.body.review) {
      throw new ExpressError(400, "Review data missing");
    }
    const {error}=reviewSchema.validate(req.body);
    if (error) {
      let errMsg= error.details.map(el => el.message).join(",");
      throw new ExpressError(400,errMsg);
      
    }
    
  
    let listing=await Listing.findById(req.params.id)
    if(!listing){
  throw new ExpressError(404, "Listing not found")
  
    }
  let newReview= new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await   listing.save();
  req.flash("success","New Review Created");
  res.redirect(`/listings/${listing._id}`)
  
  }
  module.exports.destroyReview=  async(req,res,next)=>{
    let{id,reviewId}  =req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
  
  
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted");
  res.redirect(`/listings/${id}`);
  
  
  }