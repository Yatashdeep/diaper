const users=require('../models/user');
const mongoose=require('mongoose');

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
