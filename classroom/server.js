const express =  require("express");
const app=  express();

const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const session=  require("express-session");
const flash = require('connect-flash');
const path=  require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sessionOptions={secret:"mysupersecretstring",
    resave : false,
    saveUninitialized: true,
 };
 app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg= req.flash("success");
    res.locals.errorMsg= req.flash("error");
next();
})
app.use((req, res, next) => {
    console.log("Middleware hit:", req.method, req.url, "next type:", typeof next);
    next();
});
 app.get("/register",(req,res)=>{
 let {name ="anonyomus"}=req.query;
 req.session.name= name;


//  req.flash('info', "user registered");
if (name==="anonyomus") {
req.flash("error","user not registered");


    
}else{
req.flash("info","user registered");


}

 res.redirect("/hello");

 });
 app.get("/hello",(req,res)=>{
// console.log(req.flash("info"));


res.render("page.ejs",{name:req.session.name});


 })



// app.get("/reqcount",(req,res)=>{
// if (req.session.count) {

//     req.session.count++;

    
// }else{

  
//     req.session.count=1;
// }



// res.send(`you sent a request ${req.session.count} times`);


// })








// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000,()=>{
console.log("server is the runnning");


})