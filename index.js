const express = require('express');
const mongoose = require('mongoose');
const db = require('./db')
const userRoutes = require('./routes/userRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const app = express();
const PORT = 3000

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    console.log("Home");
    return res.json("Home");
})

app.use('/user',userRoutes);
app.use('/certificate',certificateRoutes);



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})