const express=require("express")
const app=express()
const cors=require("cors")
const movieRouter=require("./router/movieRoutes")
const connectDB = require( "./confiq/db" )
require("dotenv").config()

connectDB()


const port=process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/movies",movieRouter)

app.listen(port,()=>{
    console.log(`Server live at ${port}`);
})



