const sqlite3 = require('sqlite3').verbose();
let temp = __dirname.substring(0, __dirname.length - 2);
let db = new sqlite3.Database(`${temp}/db.db`)
let s = [];
//user = Username password subscribedPath RecommendedPath Email SessionID
// db.run(`CREATE TABLE user 
// (userName char Primary key, email char key, password char Not Null, subPath char, recomPath char, SID char)`)

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

db.all
