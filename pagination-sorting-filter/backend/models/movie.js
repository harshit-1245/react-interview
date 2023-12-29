const mongoose=require("mongoose")

const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   img:{
    type:String,
    required:true,
    },
    year:{
        type:String,
        required:true,
    },
    genre:{
        type:[String], //array of strings
        required:true,
    },
    rating:{
        type:Number, 
        required:true,
    }

})

const Movie=mongoose.model("Movie",movieSchema);

module.exports=Movie;