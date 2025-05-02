const mongoose = require('mongoose');
const initData =  require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config();
// Connect to MongoDB
main().then(() => {
    console.log("connected to db");
}).catch((err)  => {
    console.log(err);
})
async function  main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}


// initialize  database
const   initDB  =  async () =>  {
    await  Listing.deleteMany({});
    initData.data =  initData.data.map((obj) => ({...obj,owner: "68089a25a9515256971f714d"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();