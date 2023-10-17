const express = require("express");
const app = express();
const path = require("path")

app.set("view engine","ejs")


app.set("views",path.join(__dirname.substring(0,__dirname.length-2),"views"))

app.get("/",(req,res)=>{
    res.render("webDev",{datas:"data"})
})



app.listen(9000, ()=>{
    console.log("HERE")
})
