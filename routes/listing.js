const express =  require("express");
const router=  express.Router();
const wrapAsync=  require("../utils/wrapasync.js");
const ExpressError=  require("../utils/ExpressError.js");
const {listingSchema}=  require("../schema.js");
const Listing=  require("../models/listing.js");
const{isLoggedIn,isOwner}=  require("../views/middleware.js");
const listingController=  require("../controllers/listings.js");
const multer  = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});

//INDEX ROUTE


router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("image"),   
  wrapAsync(listingController.createListing)

 )

// .post(upload.single('image'),(req,res)=>{
// res.send(req.file);

// })
    //NEW ROUTE
    router.get("/new",isLoggedIn,listingController.renderNewForm);
    
 router.route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn,isOwner , upload.single("image"),wrapAsync(listingController.updateListing))
 .delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))






  

  
// if (!req.isAuthenticated()) {
//   req.flash("error","you must be logged in to create listing");
//    return res.redirect("/login");

  
// }

   

// //show route

// router.get("/:id",wrapAsync(listingController.showListing));


 

   //EDIT ROUTE
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))
//UPdate route

// router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.updateListing));

  //delete route
  // router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
    module.exports=  router;
