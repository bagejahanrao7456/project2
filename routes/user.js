const express =  require("express");
const router=  express.Router();
const User=  require("../models/user.js");
const wrapAsync=  require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware.js");
const userController=  require("../controllers/users.js");

router.route("/signup")
.get(userController.renderFormSignup)
.post(wrapAsync(userController.signup))



router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
failureRedirect:"/login",
failureFlash:true,



}),userController.login

);











// catch(err){

//     console.log(" ERROR:", err.message);   // 👈 add this
//     req.flash("error", err.message);
//     res.redirect("/signup");


// }







// router.get("/login",userController.renderLoginForm);


// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
// failureRedirect:"/login",
// failureFlash:true,



// }),

// userController.login

// );


router.get("/logout",(req,res,next)=>{
req.logout(err =>{

if (err) {

   return next(err) ;
    
}
req.flash("success","you are logged in");

res.redirect("/listings");
})




})




module.exports=  router;
