const express=require('express');
const router=express.Router();
const path=require('path')
const userapi=require('../controllers/security')
router.use(express.json());
router.get('/',(requestAnimationFrame,res)=>{
    // res.redirect('/start');
   res.send('server up..')  
})
router.post('/signup',userapi.user_signup)  
router.post('/login',userapi.user_login)
router.post('/password_reset',userapi.password_reset)
router.get('/reset_password',userapi.resetpassword)
router.post('/password_match',userapi.password_match)
router.get('/user_detail',userapi.user_detail)
router.post('/rating',userapi.rating)
router.get('/fetch_rating',userapi.fetch_rating)
router.post('/recent_view',userapi.recent_view) 
router.post('/recent_view_fetch',userapi.recent_view_fetch)  
router.post('/recent_view_delete',userapi.recent_view_delete) 
router.post('/user_detailbyid',userapi.user_detailByID);
router.post('/user_detailupdatebyid',userapi.user_detailUpByID); 

router.post('/recent_viewtest',userapi.recent_viewtest);   // only for development purpose
router.post('/recent_viewtest_fetch',userapi.recent_viewtest_fetch);   // only for development purpose


 

module.exports=router
