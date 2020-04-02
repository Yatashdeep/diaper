const moongoose=require('mongoose');  
//require('mongoose-double')(moongoose);var SchemaTypes = mongoose.Schema.Types;
const RecentViewSchema=moongoose.Schema({  
    // _id:moongoose.Schema.Types.ObjectId,     
    // userid:{  type:moongoose.Schema.Types.ObjectId, ref:"user", required:true }, 
    //detailaddress:{ type:moongoose.Schema.Types.ObjectId, ref:"user", required:true },
    detailaddress:{  type:moongoose.Schema.Types.ObjectId, ref:"user", required:true },
    location:[{  lat:String, lng:String  }],  
    // loclat:{type:SchemaTypes.Double,required:true},
    // loclat:{ type:String,required:true }, 
    // loclng:{ type:String,required:true },
    create_date:{ type:Date, default: Date.now }
});
module.exports=moongoose.model('recentview',RecentViewSchema);
