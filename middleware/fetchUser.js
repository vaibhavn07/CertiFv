const User = require('../schemas/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetchUser = async (req,res,next) =>{
    const token = res.getHeader('auth-token');
    const payload = jwt.decode(token,process.env.JWT_KEY);
    const user = await User.findOne({"username":payload.user.username,"password":payload.user.password});
    if(!user) return res.json("Invalid User");
    next();
}

module.exports = fetchUser;