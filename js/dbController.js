const sqlite3 = require('sqlite3').verbose();
let temp = __dirname.substring(0,__dirname.length-2);
let db= new sqlite3.Database(`${temp}/db.db`)

//user = Username password subscribedPath RecommendedPath Email SessionID
// db.run(`CREATE TABLE user 
// (userName char Primary key, email char key, password char Not Null, subPath char, recomPath char, SID char)`)

//path = pathName article
// db.run(`CREATE TABLE path 
// (pathName char Primary key, article char)`)


function insertUser(userName,email,password,subPath="",recomPath=""){
    db.run(`INSERT INTO user(userName, email, password, subPath, recomPath) VALUES(?,?,?,?,?)`,[userName,email,password,subPath,recomPath] , (err) => {
    if(err) {
        return console.log(err.message); 
    }

})
}

function insertPath(pathName,article){
    db.run(`INSERT INTO path(pathName, article) VALUES(?,?)`,[pathName,article] , (err) => {
    if(err) {
        return console.log(err.message); 
    }

})
}

function updatePath(pathName,newArticle){
    db.run(`UPDATE path
    SET article = ?
    WHERE pathName = ?`,[newArticle,pathName])
}
insertPath("path2","sssssssssssssss")

module.exports.insertUser = insertUser;
module.exports.insertPath = insertPath;
module.exports.updatePath = updatePath;