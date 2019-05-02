const express=require('express');
const router=express.Router();
const path=require('path')
const userapi=require('../controllers/security')
router.use(express.json());
router.get('/',(requestAnimationFrame,res)=>{
    // res.redirect('/start');
   res.send('server up..')  
})
router.post('/login',userapi.user_signup)
module.exports=router