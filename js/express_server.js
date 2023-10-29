const express = require("express");
const app = express();
const path = require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname.substring(0,__dirname.length-2),"views"))
app.use(express.static(__dirname.substring(0,__dirname.length-2) + ''));



app.get("/",(req,res)=>{
    res.render("index",{datas:"<em>this is something</em>"})
})

app.get("/modules",(req,res)=>{
    res.render("modules",{datas:"data"})
})

app.get("/modules/:path",(req,res)=>{
    //get the path name from params
    //get the article from the database using its name
    //render the article
    console.log(req.params)
    res.render("path",{datas:"data"})
})

app.get("/quiz",(req,res)=>{
    res.render("quiz",{datas:"data"})
})

app.get("/login",(req,res)=>{
    res.render("login",{datas:"data"})
})

app.get("/register",(req,res)=>{
    res.render("register",{datas:"data"})
})

app.get("/about-us",(req,res)=>{
    res.render("about-us",{datas:"data"})
})

app.get("/forum",(req,res)=>{
    res.render("forum",{datas:"data"})
})

app.get("/stories",(req,res)=>{
    res.render("stories",{datas:"data"})
    
})

app.get("*/",(req,res)=>{
    res.render("not-found",{datas:"data"})
})



app.listen(3000, ()=>{
    console.log("HERE")
})
