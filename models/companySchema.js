const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    party_name:{
        type:String,
    },
    address:{
        type:String,
    },
    gst_no:{
        type:String,
    }

})

const userModel = mongoose.model('company_details', userSchema)
module.exports = userModel