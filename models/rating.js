const moongoose=require('mongoose'); 
const ratingSchema=moongoose.Schema({
    _id:moongoose.Schema.Types.ObjectId,
    type:[{
        men:String,
        woman:String,
        neutral:String,
        children:String
    }],
    change_table:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    hooks_in_change_room:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    childers_toilet:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    stroller_friendly:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    nursing:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    star_rating:{type:String,required:true,minlength:0,maxlength:15,trim:true},
    array_img:[{
        Image : String
         }],
    userid:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    detailaddress:{type:String,required:true,minlength:3,maxlength:75,trim:true},
    location:[{
        lat:String,
        lng:String
    }]

})
module.exports=moongoose.model('rating',ratingSchema)
