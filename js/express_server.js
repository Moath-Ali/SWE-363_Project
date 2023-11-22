const express = require("express");
const app = express();
const path = require("path")
const express_server_login = require('./express_server_login');
const cookieParser = require('cookie-parser')
app.set("view engine", "ejs")
app.set("views", path.join(__dirname.substring(0, __dirname.length - 2), "views"))
app.use(express.static(__dirname.substring(0, __dirname.length - 2) + ''));



// needed for POST request

const bodyParser = require("body-parser"); // Import the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add body parsing middleware for URL-encoded data
app.use(bodyParser.json());
app.use(express_server_login);




const dbController = require("./dbController")

app.get("/", (req, res) => {
    res.render("index", { datas: "<em>this is something</em>" })
})

app.get("/modules", (req, res) => {
    dbController.getAllPaths().then(data => {
        res.render("modules", { listOfPaths: data })
    })

})

app.get("/modules/:path", async (req, res) => {
    //get the path name from params
    //get the article from the database using its name
    //render the article
    const pname = req.params.path

    dbController.getPathInfo(pname).then(e => {
        if (e)
            res.render("path", { pathName: pname, intro: e.intro, article: e.article })
        else res.redirect("/modules")
    })



})

app.get("/quiz", (req, res) => {
    res.render("quiz", { datas: "data" })
})

app.get("/login", (req, res, next) => {

    //this is a way of not allowing acsess to certain pages unless the user is logged in
    if (req.cookies) {
        dbController.checkSID(req.cookies.Sid).then(data => {
            if (data) {
                //user is logged in already and their session has not endded yet
                //add a "flash" before refirectin!!
                res.redirect("/modules")
            }
            else {
                res.render('login');
            }
        })
    }

});

app.get("/register", (req, res) => {
    res.render("register", { datas: "data" })
})


app.get("/getPath", (req, res) => {
    dbController.getPathInfo(req.query.name).then(e => {
        res.json(e)
    })

})

app.put("/postPath", (req, res) => {

    dbController.updatePath(req.query.name, req.body.intro, req.body.article)
})


app.get("/about-us", (req, res) => {
    res.render("about-us", { datas: "data" })
})

app.get("/forum", (req, res) => {
    res.render("forum", { datas: "data" })
})

app.get("/stories", (req, res) => {
    res.render("stories", { datas: "data" })

})
app.get("/contact-us", (req, res) => {
    res.render("contact-us", { datas: "data" })

})
app.get("/contact-us-thank-you", (req, res) => {
    res.render("contact-us-thank-you", { datas: "data" })

})

app.get("*/", (req, res) => {
    res.render("not-found", { datas: "data" })
})



app.listen(3000, () => {
    console.log("HERE")
})
