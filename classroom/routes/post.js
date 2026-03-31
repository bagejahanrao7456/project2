
const express=  require("express");
const router = express.Router();




router.get("/",(req,res)=>{

res.send("hi, i am root")

})

//index 

router.get("/",(req,res)=>{
    res.send("GET for users");
    
    
    }
    
    );
    //show users
    router.get("/:id", (req,res)=>{
    
    res.send("Get for user ID")
    
    });
    // post Users
    router.post("/",(req,res)=>{
    res.send("POST for users");
    
    
    
    });
    //delete - users
    router.delete("/:id", (req,res)=>{
    res.send("Delete for users id");
    
    
    
    });
    module.exports=  router;
    