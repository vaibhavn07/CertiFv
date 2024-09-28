const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    certificate_id:{
        type:String
    },
    role:{
        type:String
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;