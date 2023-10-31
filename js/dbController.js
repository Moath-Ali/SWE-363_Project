const sqlite3 = require('sqlite3').verbose();
let temp = __dirname.substring(0, __dirname.length - 2);
let db = new sqlite3.Database(`${temp}/db.db`)
let s = [];
//user = Username password subscribedPath RecommendedPath Email SessionID
// db.run(`CREATE TABLE user 
// (userName char Primary key, email char key, password char Not Null, subPath char, recomPath char, SID char)`)

//path = pathName article
// db.run(`CREATE TABLE path 
// (pathName char Primary key, article char, intro char)`)


// db.run("DROP TABLE path")

function insertUser(userName, email, password, subPath = "", recomPath = "") {
    db.run(`INSERT INTO user(userName, email, password, subPath, recomPath) VALUES(?,?,?,?,?)`, [userName, email, password, subPath, recomPath], (err) => {
        if (err) {
            return console.log(err.message);
        }

    })
}

function insertPath(pathName,intro, article) {
    db.run(`INSERT INTO path(pathName,intro , article) VALUES(?,?,?)`, [pathName,intro, article], (err) => {
        if (err) {
            return console.log(err.message);
        }

    })
}

function updatePath(pathName, newArticle) {
    db.run(`UPDATE path
    SET article = ?
    WHERE pathName = ?`, [newArticle, pathName])
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

function getAllPaths(){
    return new Promise((resolve)=>{
        db.all("SELECT * FROM path",(err,rows)=>{
            if(err) return console.log(err)

            resolve(rows);
        })
    })
}
// insertPath("path2","this is an intro2","this is the <em>actual article2</em>")
module.exports.insertUser = insertUser;
module.exports.insertPath = insertPath;
module.exports.updatePath = updatePath;
module.exports.getPathInfo = getPathInfo;
module.exports.getAllPaths = getAllPaths;
