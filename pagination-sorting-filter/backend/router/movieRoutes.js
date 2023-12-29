const express=require("express");
const { getMovies } = require( "../controllers/movieControllers" );
const router=express.Router()

router.route("/").get(getMovies)


module.exports=router;