const express  = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  =   require("multer");
const  {storage} = require("../cloudConfig.js");
const  upload =   multer({storage});



// compact route for same   path
router
.route("/")
.get(wrapAsync (listingController.index))
.post(isLoggedIn,validateListing,upload.single('listing[image]'), wrapAsync(listingController.createListing ));
// .post(upload.single('listing[image]')  , (req,res) => {
//     res.send(req.file);
// })

router.get("/new",isLoggedIn, listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

// index route to show all sample data we have
// router.get("/",  wrapAsync (listingController.index));

// CREATE Route:
// part-1: New Route:   to list new 
// router.get("/new",isLoggedIn, listingController.renderNewForm);

// part-2:  Create Route: to post all info uploaded by user
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing ));

// Read: Show Route
// router.get("/:id",wrapAsync(listingController.showListing))


// Update  listing  route
// part-1:  Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// part-2: Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

//   Delete  Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));




module.exports  = router;