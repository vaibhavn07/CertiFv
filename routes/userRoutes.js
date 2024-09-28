const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../schemas/User');

router.get('/login',async (req,res)=>{
    const data = req.body;
    const d =await User.findOne({username:data.username});

    console.log(data)
    console.log(d.username,d.password);
    const payload = {
        user:{
            username:data.username,
            password:data.password
        }
    };
    if(d.password===data.password){
        const token = jwt.sign(payload,process.env.JWT_KEY);
        res.setHeader('auth-token',token);
        return res.json(token);
    }

    return res.json("Invalid");

});

router.post('/signup',async (req,res)=>{
    const data = req.body;
    const d = await User.findOne({"username":data.username});

    if(d){
        return res.json("Already Exists");
    }

    const user = new User(data);
    await user.save();
    return res.json("User created");
});

module.exports = router;