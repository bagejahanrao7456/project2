const mongoose=  require("mongoose");
const Schema = mongoose.Schema;
const listingSchema= new Schema({

title :{ 
    type:String,
required: true,
trim:true
},
description : String,
image: {
    type:String,
set:(v)=> v==="" ? "https://unsplash.com/photos/dramatic-mountain-valley-with-a-winding-road-and-cabin-L6-l45Y_om0": v,
},
price: Number,
location:String,
country: String,


})



const listing= mongoose.model("listing",listingSchema );
module.exports= listing;