const mongoose=require('mongoose'); 
const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String,required:true,minlength:3,maxlength:15,trim:true},
    lastname:{type:String,required:true,minlength:3,maxlength:15,trim:true},
    birth:{type:String,required:true,minlength:3,maxlength:15,trim:true},
    gender:{type:String,required:true,minlength:3,maxlength:15,trim:true},
    mobile:{type:Number,required:true,minlength:3,maxlength:15,trim:true},
    email:{ 
        type: String,
        required:true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true
    },
    password:{ type: String,required:true },
    Children:[{fullname:String,dateofbirth:String,gender:String}],
    create_date:{
        type:Date,
        default: Date.now
    },
    token_key:{type: String},
    token_expire:{type: String},
    status:{type:Number,default:1}
})
module.exports=mongoose.model('user',userSchema)