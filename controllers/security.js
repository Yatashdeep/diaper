const users=require('../models/user');
const ratings=require('../models/rating');
const recentview=require('../models/recentview');
const recentviewtest=require('../models/recentviewtest');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');
const express=require('express'); 
const app=express();
const morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(morgan('dev'));

exports.user_signup=(req,res,next)=>{
    console.log('email'+req.body.email)
  
    users.findOne({ email:req.body.email})
    .exec()
    .then(user=>{
        console.log('hope'+user)
        if(user)
        {
            return res.status(200).json({
                message:"Email Id exist"
            });
        }
        else{
            const user=new users({
                _id:mongoose.Types.ObjectId(),
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                birth:req.body.birth,
                gender:req.body.gender,
                mobile:req.body.mobile,
                email:req.body.email,
                password:req.body.password,
                Children:req.body.Children
                
            })
           
            user.save().then(result=>{
                res.status(200).json({
                    message:'User Created'
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                     });
            })
             
        }
    })
}

exports.recent_view=(req,res,next)=>{  
            const user=new recentview({ detailaddress:req.body.detailaddress,location:req.body.location }); 
            user.save().then(result=>{
                return res.status(200).json({   message:'success message'  });
            }).catch(err=>{
                return  res.status(500).json({   error:err   });
            }) 
}  

exports.recent_viewtest=(req,res,next)=>{   
    console.log("req.body.userid=",req.body.detailaddress); console.log("req.body.location=",req.body.location);
    recentviewtest.find({ detailaddress:req.body.detailaddress ,loclat:req.body.location[0].lat,loclng:req.body.location[0].lng}).exec().then(user=>{ 
        console.log("user=",user);
        console.log("user length=",user.length);
        if(user.length !=0)  { 
            return res.status(200).json({   message:"Already exist"  }); 
        }
        else{
           const user=new recentviewtest({  detailaddress:req.body.detailaddress,location:req.body.location,loclat:req.body.location[0].lat,loclng:req.body.location[0].lng  });
            user.save().then(result=>{
                return res.status(200).json({   message:'success message'  });
            }).catch(err=>{
                return  res.status(500).json({   error:err   });
            }) 
        }
    })
} 

exports.recent_viewtest_fetch=(req,res,next)=>{   
    recentviewtest.find({ detailaddress:req.body.detailaddress }).exec().then(data=>{
        return res.status(200).json({  message:data   });          
    }).catch(err=>{
       return res.status(200).json({  message:err  });
    })   
    }
  
exports.recent_view_fetch=(req,res,next)=>{   
recentview.find({ detailaddress:req.body.userid }).exec().then(data=>{
    return res.status(200).json({  message:data   });          
}).catch(err=>{
   return res.status(200).json({  message:err  });
})   
}

exports.recent_view_delete=(req,res,next)=>{   
    recentview.find().remove().exec().then(data=>{ 
        return res.status(200).json({  message:data   });          
    }).catch(err=>{   
       return res.status(200).json({  message:err  });
    })  
}


exports.rating=(req,res,next)=>{  
    console.log('type'+req.body.type)
    const rating=new ratings({
        _id:mongoose.Types.ObjectId(),
        type:req.body.type,
        change_table:req.body.change_table,
        hooks_in_change_room:req.body.hooks_in_change_room,
        childers_toilet:req.body.childers_toilet,
        stroller_friendly:req.body.stroller_friendly,
        nursing:req.body.nursing,
        star_rating:req.body.star_rating,
        array_img:req.body.array_img,
        userid:req.body.userid,
        detailaddress:req.body.detailaddress,
        location:req.body.location
        
    })
   
    rating.save().then(result=>{
        res.status(200).json({
            message:'Rating  Created'
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
             });
    })
    
   
}
exports.fetch_rating=(req,res,next)=>{
     ratings.find().populate('userid').exec().then(data=>{
          return res.status(200).json({
              message:data
          })         
     }).catch(err=>{
         return res.status(200).json({
             message:err
         })
     })
}

exports.user_detail=(req,res,next)=>{
 
    users.find().exec().then(user=>{
        
         return res.status(200).json({
         message:user
         });
    }).catch(err=>{
        return res.status(200).json({
            message:err
            });
    })
   
 
}

exports.user_detailByID=(req,res,next)=>{  
    users.find({_id:req.body.userid}).exec().then(user=>{
         return res.status(200).json({ message:user });
    }).catch(err=>{
        return res.status(200).json({ message:err  });
    })
}

exports.user_detailUpByID=(req,res,next)=>{     
    users.findOne({_id:req.body.userid}).exec().then(doc=>{
        doc.firstname = req.body.firstname;
        doc.lastname = req.body.lastname;
        doc.birth = req.body.birth;
        doc.gender = req.body.gender;
        doc.mobile =req.body.mobile;
        doc.email = req.body.email;
        doc.save(); 
        users.find({_id:req.body.userid}).exec().then(user=>{
            return res.status(200).json({ message:"Your profile updated successfully.",getdata:user,status:1 });
       }).catch(err=>{
            return res.status(200).json({ message:"Your profile updated successfully.",getdata:err,status:0 });
       })  
    }).catch(err=>{
        return res.status(200).json({ message:"Please try again later",status:0  }); 
    })
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
                Children:user.Children,
                user_id:user._id
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





