const mongoose =  require("mongoose");
const initData=  require("./newdata.js");
const Listing= require("../models/listing.js");

let MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
console.log("connected to DB")


}).catch((err)=>{
console.log(err);


})




async function main(){
 await mongoose.connect(MONGO_URL);




}

const initDB= async()=>{
await Listing.deleteMany({});
initData.data= initData.data.map((obj)=>({...obj, owner:'69a06181f46c9364a53105e1'


})



)
await Listing.insertMany(initData.data);
console.log("data was initialized");

}



initDB()