const express = require("express");
const app = express();
const path = require("path")
const express_server_login = require('./express_server_login');
const nodemailer = require('nodemailer');

const cookieParser = require('cookie-parser')
app.set("view engine", "ejs")
app.set("views", path.join(__dirname.substring(0, __dirname.length - 2), "views"))
app.use(express.static(__dirname.substring(0, __dirname.length - 2) + ''));



// needed for POST request

const bodyParser = require("body-parser"); // Import the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add body parsing middleware for URL-encoded data
app.use(bodyParser.json());
app.use(express_server_login);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/contact-us-thank-you', async (req, res) => {
  try {
    // Extract form data
    const { name, Subject,email, message } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devpath23@gmail.com', // Replace with your email address
        pass: 'dejajndgrjbleqdz' // Replace with your email password or an app password
      }
    });

    // Setup email data
    let mailOptions = {
      from: `${email}`,
      to: 'devpath23@gmail.com', // Replace with the recipient's email address
      subject: `${Subject}`,//'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.redirect('/contact-us-thank-you'); // You can customize this response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const dbController = require("./dbController")

app.get("/", (req, res) => {
    const user= req.cookies.user;
    res.render("index", { datas: "<em>this is something</em>" , user,html:""})
})


app.get("/modules", (req, res) => {
    const user =req.cookies.user;
    dbController.getAllPaths().then(data => {
        res.render("modules", { listOfPaths: data, user })
    })

})



app.get("/modules/:path", async (req, res) => {
    //get the path name from params
    //get the article from the database using its name
    //render the article
    const user =req.cookies.user;
    const pname = req.params.path

    dbController.getPathInfo(pname).then(e => {
        if (e)
            res.render("path", { pathName: pname, intro: e.intro, article: e.article,user })
        else res.redirect("/modules")
    })
})


app.get("/quiz",(req,res)=>{
    dbController.getAllQuest().then(data => {
        res.render("quiz", { listOfQuest: data })
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
                const username = data.userName;
                res.redirect("/?username="+username)
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

app.post("/insertpath", (req, res) => {
    const body = req.body;
    dbController.insertPath(body.name,body.intro,body.article,body.img)
    res.redirect("/modules")
})


app.get("/about-us", (req, res) => {
    res.render("about-us", { datas: "data" })
})

app.get("/logout", (req, res) => {
    res.render("logout", { datas: "data" })
})

app.get("/logout2", (req, res) => {
    res.render("logout", { datas: "data" })
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

app.get("/quiz-start", (req, res) => {
    res.render("quiz-start", { datas: "data" })

})
app.get("/quiz-end", (req, res) => {
    res.render("quiz-end", { datas: "data" })

})
app.get("/error-500", (req, res) => {
    res.render("error-500", { datas: "data" })

})

app.get("/quests",(req,res)=>{
    const user =req.cookies.user;
    dbController.getAllPaths().then(data => {
        res.render("quests", { paths: data,user })
    })

})

app.get("/quests/:questType", async (req, res) => {

    const user =req.cookies.user;
    const questType = req.params.questType;
    
    dbController.getQuestsType(questType).then(data => {
        if (data){
            res.render("questsType", { paths: data,user })}
        else res.redirect("/quests")
    })
})

app.get("/quests/:questType/:quest", async (req, res) => {

    const user =req.cookies.user;
    const questType = req.params.questType;
    const quest = req.params.quest;
    
    dbController.getQuest(quest).then(data => {
        if (data){
            res.render("quest", { quests: data,user })}
        else res.redirect("/quests")
    })
    
})


app.get("*/", (req, res) => {
    res.render("not-found", { datas: "data" })
})



// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  // ...
});