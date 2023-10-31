const express = require("express");
const app = express();
const path = require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname.substring(0,__dirname.length-2),"views"))
app.use(express.static(__dirname.substring(0,__dirname.length-2) + ''));

// for hashing

const bcrypt = require('bcrypt');
const saltRounds = 10;

// needed for POST request

const bodyParser = require("body-parser"); // Import the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add body parsing middleware for URL-encoded data
app.use(bodyParser.json());






const dbController = require("./dbController")

app.get("/",(req,res)=>{
    res.render("index",{datas:"<em>this is something</em>"})
})

app.get("/modules",(req,res)=>{
    
    res.render("modules",{datas:"data"})
})

app.get("/modules/:path",async (req,res)=>{
    //get the path name from params
    //get the article from the database using its name
    //render the article
    const pname = req.params.path

    dbController.getPathInfo(pname).then(e=>{
        res.render("path",{pathName: pname, intro:e.intro, article: e.article})
    })
       
    
    
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









// Registering process
  // wont need more parameters since register should not have subPath and recomPath but still need to add SID


  app.post("/register", (req, res) => {
    const { userName, email, password } = req.body;
  
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return console.error(err);
      }
      
      dbController.insertUser(userName, email, hash); 
      res.redirect("/login");
    });
  });











  //TESTING





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
