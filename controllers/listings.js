const  Listing  = require("../models/listing");
const axios = require('axios');

module.exports.index   =  async (req,res) => {
    const  allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}

module.exports.renderNewForm  = (req,res) => {
    res.render("./listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
        path:"author",
    }}).populate("owner");
    
    if(!listing){
        req.flash("error","Listing you requested for! does not  exist!")
        return  res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
}

module.exports.createListing =   async (req,res) => {
    let   {title,description,image,price,location,country} = req.body.listing;

    let url = req.file.path;
    let filename = req.file.filename;

        // Geocode the location to get latitude and longitude using Nominatim
        let coordinates = { lat: null, lng: null };
        try {
            const geocodeResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: location,  // The location string from the form
                    format: 'json',  // Get the response in JSON format
                    addressdetails: 1,  // Include detailed address information
                    limit: 1,  // Only get the first result
                },
                headers: {
                    'User-Agent': 'YourAppName/1.0 (your@email.com)',  // Replace with your app name and email
                }
            });
    
            // Check if the geocode response contains results
            if (geocodeResponse.data && geocodeResponse.data.length > 0) {
                const result = geocodeResponse.data[0];
                coordinates.lat = parseFloat(result.lat);  // Latitude
                coordinates.lng = parseFloat(result.lon); // Longitude
            } else {
                console.log("Geocode failed: Location not found.");
            }
        } catch (error) {
            console.error("Error in geocoding with Nominatim:", error);
        }

   let  formListing  = req.body.listing;
   const newListing = new Listing(formListing);
   newListing.owner = req.user._id;
   newListing.image  = {url,filename};
   newListing.coordinates.lat = coordinates.lat;
   newListing.coordinates.lng = coordinates.lng;
   console.log("newlisting:   ",newListing);
   
   await  newListing.save();

   req.flash("success","New Listing created successfully!!");
//    req.flash("coordinates", coordinates);

   res.redirect("/listings");
   // console.log(listing);

}

module.exports.renderEditForm =  async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for! does not  exist!")
        return  res.redirect("/listings");
    }
    let  originalImageUrl =  listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing = async (req,res) => {
    let {id}  =  req.params;

    let  listing  = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file  !==   "undefined"){
        let  url = req.file.path;
        let filename  = req.file.filename;
        listing.image  = {url,filename};
        await  listing.save();
    }

    req.flash("success","Listing updated successfully!!");
    res.redirect(`/listings/${id}`); 
}

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await  Listing.findByIdAndDelete(id);
    console.log(deletedListing);

    req.flash("success","Listing deleted successfully!!");

    res.redirect("/listings");
}