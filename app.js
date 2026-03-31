if (process.env.NODE_ENV!= "production") {
  require('dotenv').config();
}



require('events').EventEmitter.defaultMaxListeners = 20;
const express =  require("express");
const app=  express();
const mongoose =  require("mongoose");
// const Listing=  require("../models/listing.js");
let path= require("path");
const methodOverride = require("method-override");
const ejsMate=  require("ejs-mate");
const wrapAsync=  require("./utils/wrapasync.js");
const ExpressError=  require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=  require("./schema.js");
const Review = require("./models/review.js");
const listings=  require("./routes/listing.js");
const reviewRoutes = require("./routes/reviews.js");
const session=  require("express-session");
const MongoStore= require('connect-mongo');
const flash=  require("connect-flash");
const passport = require("passport");
const LocalStrategy= require("passport-local");
const User=  require("./models/user.js");

const listingRouter=  require("./routes/listing.js");
const reviewRouter=  require("./routes/reviews.js");
const userRouter=  require("./routes/user.js");

//  let MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';

const dbUrl= process.env.ATLASDB_URL;






async function main(){
 await mongoose.connect(dbUrl);




}
main().then(()=>{
  console.log("connected to DB")

  
  })
  
  
  
  .catch((err)=>{
  console.log(err);
  
  
  })





  app.engine('ejs',ejsMate);
  app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded( {extended:true}));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
mongoUrl:dbUrl,
crypto:{
secret:'thisshouldbeabettersecret',


},

touchAfter:24*3600,


})

store.on("error",(err)=>{
console.log("ERROR in MONGO SESSION STORE",err)

})


const sessionOptions= {
store,
secret:'thisshouldbeabettersecret',
resave:false,
saveUninitialized:false,
cookie:{
expires:new Date(Date.now() + 7*24 *60* 60*1000),
maxAge:7*24 *60* 60*1000,
httpOnly:true,


}




};



app.use(session(sessionOptions));





app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


























app.use(flash());
app.use((req,res,next)=>{
  res.locals.currUser= req.user;
  res.locals.success= req.flash("success");
  res.locals.error= req.flash("error");
console.log("currUser",req.user);
  next();
  
  
  
  })


app.use("/",userRouter);
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

  









app.use((req,res,next)=>{
  next(new ExpressError(404, "page not found"));
  
  
  
  });

app.use(( err,req,res ,next)=>{
  console.error("full error");
  console.log(err);
  console.error( err.stack);
const statusCode= err.statusCode|| 500;
const message= err.message || "something went wrong";
// res.status(statusCode).send(message);
res.status(statusCode).render("error.ejs",{message})


});





app.listen(8080, ()=>{

console.log("server is listening to port 8080");


});
