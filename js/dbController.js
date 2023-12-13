const sqlite3 = require('sqlite3').verbose();
let temp = __dirname.substring(0, __dirname.length - 2);
let db = new sqlite3.Database(`${temp}/db.db`)
let s = [];
//user = Username password subscribedPath RecommendedPath Email SessionID
// db.run(`CREATE TABLE user 
// (userName char Primary key, email char key, password char Not Null, subPath char, recomPath char, SID char)`)

// db.run(`CREATE TABLE admin 
// (userName char, 
//     FOREIGN KEY (userName) references user (userName))`)


//path = pathName article
// db.run(`CREATE TABLE path 
// (pathName char Primary key, article char NOT NULL, intro char NOT NULL, imgSrc char NOT NULL)`)


// db.run("DROP TABLE path")

function insertUser(userName, email, password, subPath = "", recomPath = "") {
    db.run(`INSERT INTO user(userName, email, password, subPath, recomPath) VALUES(?,?,?,?,?)`, [userName, email, password, subPath, recomPath], (err) => {
        if (err) {
            return console.log(err.message);
        }

    })
}

function insertPath(pathName, intro, article, imgSrc) {
    db.run(`INSERT INTO path(pathName,intro , article, imgSrc) VALUES(?,?,?,?)`, [pathName, intro, article, imgSrc], (err) => {
        if (err) {
            return console.log(err.message);
        }

    })
}

function updatePath(pathName, newIntro, newArticle) {
    db.run(`UPDATE path
    SET article = ?,
        intro = ?
    WHERE pathName = ?`, [newArticle, newIntro, pathName])
}

function getPathInfo(pathName) {
    //when calling a function from another js file
    //and waiting for a result we must use a promise
    //then return the promise after we resolve it
    return new Promise(function (resolve) {
        db.all(`SELECT intro,article FROM path
        WHERE pathName = ?`, [pathName], (err, rows) => {
            if (err) console.log(err)
            else {
                resolve(rows[0]);
            }
        })
    })
}

function getAllPaths() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM path", (err, rows) => {
            if (err) return console.log(err)

            resolve(rows);
        })
    })
}
function getAllQuest() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM quiz", (err, rows) => {
            if (err) return console.log(err)
            resolve(rows);
        })
    })
}
function checkUser(email) {
    return new Promise(function (resolve) {
        db.all(`SELECT password FROM user WHERE email = ?`,[email], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows[0]);
            }
        })
    })
}
function checkUs(email) {
    return new Promise(function (resolve) {
        db.all(`SELECT userName FROM user WHERE email = ?`,[email], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows[0]);
            }
        })
    })
}
function saveSID(SID,email){
    db.run(`UPDATE user SET SID = ? WHERE email = ?`,[SID,email])
}
function checkSID(SID){
    return new Promise(function (resolve) {
        db.all(`SELECT userName FROM user WHERE SID = ?`,[SID], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows[0]);
            }
        })
    })
}

function getQuestsType(type){
    return new Promise(function (resolve) {
        db.all(`SELECT * from quest where questType = ?`,[type], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows);
            }
        })
    })
}

function getQuest(name){
    return new Promise(function (resolve) {
        db.all(`SELECT * from quest where questName = ?`,[name], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows[0]);
            }
        })
    })
}

function saveRecomPath(user,pathName){
    db.run(`INSERT INTO recomPath(userName,pathName) VALUES(?,?)`, [user,pathName], (err) => {
        if (err) {
            return console.log(err.message);
        }

    })
}

function getRecomPath(user){
    return new Promise(function (resolve) {
        db.all(`SELECT * from recomPath where userName = ?`,[user], (err, rows) => {
            if (err) return console.log(err)
            else {
                resolve(rows);
            }
        })
    })
}

function insertQuest(questType,questName,questImg,questIntro){
    db.run(`insert into quest(questType,questName,questImg,questIntro) Values(?,?,?,?)`,[questType,questName,questImg,questIntro],(err,rows)=>{
        if(err) console.log(err)
    })
}
function insertSteps(questType,questName,stepHash,stepImg,stepTitle,stepContent){
    db.run(`insert into steps Values(?,?,?,?,?,?)`,[questType,questName,stepHash,stepImg,stepTitle,stepContent],(err,rows)=>{
        if(err) console.log(err)
    })
}
// insertPath("Data_Analytics",`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat optio illo repellendus aut? Quas assumenda tempore minus mollitia distinctio nisi, veritatis quae ducimus facere quod, incidunt atque reprehenderit nostrum.
// Tempore hic molestiae doloribus, ducimus incidunt voluptatibus eligendi voluptas, in nihil quos tenetur illum inventore eius non, eum aliquam nisi facere consequuntur quia? Placeat nobis iste fuga sit ratione rem!`,
// `this is the <em>actual article2</em> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat optio illo repellendus aut? Quas assumenda tempore minus mollitia distinctio nisi, veritatis quae ducimus facere quod, incidunt atque reprehenderit nostrum.
// Tempore hic molestiae doloribus, ducimus incidunt voluptatibus eligendi voluptas, in nihil quos tenetur illum inventore eius non, eum aliquam nisi facere consequuntur quia? Placeat nobis iste fuga sit ratione rem!`,'/Resources/data-ana.jpg')
module.exports.insertUser = insertUser;
module.exports.insertPath = insertPath;
module.exports.updatePath = updatePath;
module.exports.getPathInfo = getPathInfo;
module.exports.getAllPaths = getAllPaths;
module.exports.checkUser = checkUser;
module.exports.saveSID = saveSID;
module.exports.checkSID = checkSID;
module.exports.checkUs = checkUs;
module.exports.getAllQuest = getAllQuest;
module.exports.getQuestsType = getQuestsType;
module.exports.getQuest = getQuest;
module.exports.saveRecomPath = saveRecomPath;
module.exports.getRecomPath = getRecomPath;
module.exports.insertQuest = insertQuest;
module.exports.insertSteps = insertSteps;

