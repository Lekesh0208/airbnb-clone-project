const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =  require("passport-local-mongoose");

const  userSchema =  new Schema({
    email:{
        type:String,
        required:true
    }
    // so  basically passport-local-mongoose automatically pre defined  username and hashed passpord and salt value  in userSchema

});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);