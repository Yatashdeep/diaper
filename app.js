const express=require('express')
const app=express();
const ejs=require('ejs');
const home=require('./routes/home');
const path=require('path')
const mongoose=require('mongoose')

app.use('/',home);
app.set('view engine','ejs');
const dba='mongodb://yatash:vishal786@ds151076.mlab.com:51076/diaperchange'
mongoose.connect(dba,{useNewUrlParser:true},function(error){
    if(error) console.log(error);
    console.log("connection successful")
})
mongoose.set('useCreateIndex',true)
var db=mongoose.connection

module.exports=app;