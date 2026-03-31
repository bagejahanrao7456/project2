const Listing=  require("../models/listing");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
module.exports.index = async(req,res)=>{
const allListings=  await Listing.find({});
res.render("listings/index.ejs",{allListings});



}

module.exports.renderNewForm=  (req,res)=>{
res.render("listings/new.ejs");


}

module.exports.showListing= async(req,res,next)=>{
    console.log("SHOW USER:", req.user);
  
      const {id}  = req.params;
     const listing= await Listing.findById(id).populate({ path:"reviews",
      populate:{
  path:"author",
  
  
      },}
     )
     .populate("owner");
    
  
    if (!listing) {
      // return res.status(404).send("Listing not found")
      
  req.flash("error","Listing you requested for does not exist!")
   return res.redirect("/listings");
    }
    console.log(listing)
    res.render("listings/show.ejs",{listing});
    
    
    
    
    
    }
    module.exports.createListing=  async(req,res,next)=>{
//  let url = req.file.path;
//  let filename=  req.file.filename;
//  console.log(url,"..",filename);
 
 
        const {error}=listingSchema.validate(req.body);
       if (error) {
         let errMsg= error.details.map(el => el.message).join(",");
         throw new ExpressError(400,errMsg);
         
       }
       
       const newListing = new Listing(req.body.listing);
       
       
           console.log(req.body.listing?.title);
          //  const  newlisting=   new Listing(req.body.listing);

           if (req.file) {
            newListing.image = {
              // url: "/uploads/" + req.file.filename,
              url:req.file.path,
              filename: req.file.filename
            };
          }
           newListing.owner= req.user._id;
           await newListing.save();
           req.flash("success","New Listing Created");
           
           res.redirect("/listings");
       
       
         
       
       
          }
          module.exports.editListing=  async(req,res)=>{
            const { id } = req.params;

            const listing = await Listing.findById(id);
        
            if (!listing) {
                req.flash("error", "Listing not found");
                return res.redirect("/listings");
            }
        
            res.render("listings/edit.ejs", { listing });
        
 
 
        //     const {error}=listingSchema.validate(req.body);
        //    if (error) {
        //      let errMsg= error.details.map(el => el.message).join(",");
        //      throw new ExpressError(400,errMsg);
             
        //    }
           
           
           
           
            //    console.log(req.body.listing?.title);
            //    const  newlisting=   new Listing(req.body.listing);
            //    newlisting.owner= req.user._id;
            //    await newlisting.save();
            //    req.flash("success","New Listing Created");
               
            //    res.redirect("/listings");
           
           
             
           
           
              }
              module.exports.updateListing= async(req,res,next)=>{

                const { error } = listingSchema.validate(req.body);

                if (error) {
                    let errMsg = error.details.map(el => el.message).join(",");
                    throw new ExpressError(400, errMsg);
                }



                if(!req.body.listing){
                  throw new ExpressError(400,"send valid data for listing");
                  
                  }
              
              
              
              let {id} = req.params;
            
            
            
               let listing=await Listing.findByIdAndUpdate(id,
                {...req.body.listing},
                { runValidators:true});

  if(req.file){

                let url=req.file.path;
                let filename= req.file.filename;
                listing.image={url,filename};
                await listing.save();
  }
                req.flash("success","Listing Updated");
               res.redirect(`/listings/${id}`);
              
              }

              module.exports.destroyListing=  async(req,res,next)=>{
                let {id} = req.params;
                
                  let deletedlisting= await Listing.findByIdAndDelete(id);
                console.log(deletedlisting);
                req.flash("success"," Listing Deleted");
                res.redirect("/listings");
                
                
                }
             
            