const sqlite3 = require('sqlite3').verbose();
let temp = __dirname.substring(0,__dirname.length-2);
let db= new sqlite3.Database(`${temp}/db.db`)

//user = Username password subscribedPath RecommendedPath Email SessionID
// db.run(`CREATE TABLE user 
// (userName char Primary key, email char key, password char Not Null, subPath char, recomPath char, SID char)`)

//path = pathName article
// db.run(`CREATE TABLE path 
// (pathName char Primary key, article char)`)


function insertUser(userName,email,password,subPath="",recomPat=""){
    db.run(`INSERT INTO user(userName, email, password) VALUES(?,?,?,?,?)`,[userName,email,password,subPath,recomPat] , (err) => {
    if(err) {
        return console.log(err.message); 
    }
    console.log(`Row was added to the table: ${this.lastID}`);
    db.all("SELECT * FROM user" , (err,rows)=>{
        console.log(rows)
    })
})
}

function insertPath(pathName,article){
    db.run(`INSERT INTO path(pathName, article) VALUES(?,?)`,[pathName,article] , (err) => {
    if(err) {
        return console.log(err.message); 
    }
    console.log('Row was added to the table: ${this.lastID}');
    db.all("SELECT * FROM user" , (err,rows)=>{
        console.log(rows)
    })
})
}


module.exports.insertUser = insertUser;
