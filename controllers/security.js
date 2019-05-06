const users=require('../models/user');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer')
const bodyParser = require('body-parser');
const express=require('express')
const app=express();
const morgan = require('morgan');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(morgan('dev'));
exports.user_signup=(req,res,next)=>{
    console.log('email'+req.body.email)
      return res.status(200).json({"status":"ok"})
//     users.findOne({ email:req.body.email})
//     .exec()
//     .then(user=>{
//         console.log('hope'+user)
//         if(user)
//         {
//             return res.status(200).json({
//                 message:"Email Id exist"
//             });
//         }
//         else{
//             const user=new users({
//                 _id:mongoose.Types.ObjectId(),
//                 firstname:req.body.firstname,
//                 lastname:req.body.lastname,
//                 birth:req.body.birth,
//                 gender:req.body.gender,
//                 mobile:req.body.mobile,
//                 email:req.body.email,
//                 password:req.body.password,
//                 Children:req.body.Children
                
//             })
           
//             user.save().then(result=>{
//                 res.status(200).json({
//                     message:'User Created'
//                 });
//             }).catch(err=>{
//                 console.log(err);
//                 res.status(500).json({
//                     error:err
//                      });
//             })
             
//         }
//     })
}
exports.user_login=(req,res,next)=>{
    users.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user)
        {
            if(user.password==req.body.password)
            {
        const data={
            firstname:user.firstname,
                lastname:user.lastname,
                birth:user.birth,
                gender:user.gender,
                mobile:user.mobile,
                email:user.email,
                Children:user.Children
        }
       return res.status(200).json({
           message:'logged in',
           data:data
       })
      
    }
else
{
    return res.status(200).json({
        message:'password wrong',
        
    })
}
       } 
       else
       {
        return res.status(200).json({
            message:'Email ID not exist'
        });  
       }
     } )
    
}

exports.password_reset=(req,res,next)=>{
   // res.render('password_reset',{msg: "Password Reset, Please Login in Mobile Application"});
   users.findOne({email:req.body.email})
   .exec()
   .then(result=>{
       if(result)
       {
           var transporter=nodemailer.createTransport({
               service:'gmail',
               auth:{
                   user:'ytuxedo786@gmail.com',
                   pass:'yashudievo'
               }
           })
         var chars_key='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
         var token='';
         for(var i=16;i>0;--i)
         {
          token+=chars_key[Math.round(Math.random()*(chars_key.length-1))];
         }
         var content_body1 = '<p>We heard that you lost your Diaper Change password,don’t worry! You can use the following link to reset your password.</p>';
        //  var content_body2  = '<p>If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit <a href="http://localhost:3000/reset_password?key='+token+'&id='+result._id+'">http://localhost:3000/reset_password</a></p><p>Thanks</p><p>Your friends at Diaper Change Team</p>'; 
        var content_body2  = '<p>If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit <a href="https://diaperchange.herokuapp.com/reset_password?key='+token+'&id='+result._id+'">https://diaperchange.herokuapp.com/reset_password</a></p><p>Thanks</p><p>Your friends at Diaper Change Team</p>'; 
        var content_body=content_body1+content_body2;
         var mailoptions={
             from:'scavanger@gmail.com',
             to: result.email,
            subject: 'Reset Password',
            text: 'That was easy!',
            html: content_body
         };
         transporter.sendMail(mailoptions,function(error,info)
         {
           if(error)
           {
             console.log(error);  
           }
           else{
            var curr_date = new Date();
            var update = {
                token_key: token,
                token_expire: curr_date
            }
            var query = {_id:result._id};
            users.findOneAndUpdate(query,update)
            .exec();
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            message:'Mail Sent Successfully'
        });   
           }
         });
       }
       else{
           return res.status(200).json({
               message:'Email does not exist'
           })
       }
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
        error: err
    });
});

}
exports.resetpassword=(req,res,next)=>{
 
    users.findOne({ _id: req.query.id , token_key: req.query.key })
        .exec()
        .then( result => {
            console.log(result)
            if(result){
              var curr_date = new Date();
              
              timeDiff = Math.floor( (Date.parse(curr_date) - Date.parse(result.token_expire)) / (1000*60) % 60);
              if(timeDiff < 30){
              res.render('password_reset',{msg: "Password Reset, Please Login in Mobile Application"});
              }else{
                res.render('password_reset',{user_msg: "Link Expire"});
              }
            }else{
              res.render('password_reset',{user_msg: "Invalid Token"});
            }
        }).catch(err=>{
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
   
}

exports.password_match=(req,res,next)=>{
    console.log('request',req.body.object_id,req.body,req.body.password)
  
users.findOne({_id:req.body.object_id,token_key:req.body.key})
.exec()
.then(result=>{
    console.log('res',result)
    if(result)
    {
     var query={_id:result._id};
     var update={
         password:req.body.password,
         token_key:'',
         token_expire:''
     }
     users.findOneAndUpdate(query,update)
     .exec()
     .then(result=>{
        console.log('password_reset') 
        res.render('password_reset',{user_msg:"Password Reset,Please login in Mobile Application"})
     }).catch(err=>console.log(err));
    }
    else{
        res.render('password_reset',{user_msg:"U can't be smart"});
    }
})



}





