
const User = require("../models/user.js");

module.exports.renderFormSignup= (req,res)=>{
    // res.send("form");
res.render("users/signup.ejs",{

    successMsg: req.flash("success"),
    errorMsg: req.flash("error")


});

}

module.exports.signup = async(req,res,next)=>{




    const{username, email,password}=  req.body;
    const newUser=  new User({email,username});
    const registeredUser= await User.register(newUser,password);


    req.login(registeredUser, (err)=>{   // ⚠️ err parameter MUST
        if(err){
            return next(err);
        }
    console.log(registeredUser);
// req.login(registeredUser,(err)=>{
// if (err) {
//    return next(err) ;

    
// }
 req.flash("success", "welcome to Wanderlust");
 let redirectUrl = req.session.redirectUrl || "/listings";
 res.redirect(redirectUrl);

    // res.redirect(req.session.redirectUrl);

// })

    });




// req.flash("error",e.message);
// res.redirect("/signup");

}
module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
    
    
    
    }
    module.exports.login= async(req,res)=>{
        req.flash("success","welcome to wanderlust! you are logged in")
        let redirectUrl= res.locals.redirectUrl|| "/listings";
        
        res.redirect(redirectUrl);
        }


        module.exports.logout= (req,res,next)=>{
            req.logout(err =>{
            
            if (err) {
            
               return next(err) ;
                
            }
            req.flash("success","you are logged in");
            
            res.redirect("/listings");
            })
            
            
            
            
            }
        
        
        