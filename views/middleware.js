
const Listing =  require("../models/listing");
const Review =  require("../models/review");
const { reviewSchema } = require("../schema");
module.exports.isLoggedIn = (req,res,next) =>{

    if (!req.isAuthenticated()) {
        // req.session.req.originalUrl = req.originalUrl;
        req.session.originalUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
         return res.redirect("/login");
      
        
      }
      next();


}

module.exports.saveRedirectUrl=  (req,res,next)=>{

if (req.session.redirectUrl) {
    res.locals.redirectUrl= req.session.redirectUrl;

    
}
next();

}

module.exports.isOwner= async(req,res,next) =>{
let{id} = req.params;
 let listing = await Listing.findById(id);
 let currUser = req.user;

if (!listing.owner._id.equals(currUser._id)) {
req.flash("error","you don't have permission for edit")
 return res.redirect(`/listings/${id}`);


}
next();
}




module.exports.isReview= async(req,res,next) =>{
    let{id,reviewId} = req.params;
     let review= await Review.findById(reviewId);
     let currUser = req.user;
     if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author) {
        req.flash("error", "Review author missing");
        return res.redirect(`/listings/${id}`);
    }
    
    if (!review.author.equals(currUser._id)) {
    req.flash("error","you are not the author of this review")
     return res.redirect(`/listings/${id}`);
    
    
    }
    next();
    }
    // const { reviewSchema } = require("../schemas/review");

module.exports.validateReview = (req, res, next) => {

  if (req.body.review ) {
    let rating = Number(req.body.review.rating);
    if (isNaN(rating) || rating < 1) {
        rating = 1;
      }
  
      req.body.review.rating = rating;
    }
  

  

  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    req.flash("error", msg);
    return res.redirect("/listings"); // ya jis page se form aaya
  } 
  next();
};