var books = require('google-books-search');
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (db) => {

    let getAll = (callback) => {
        let query = 'SELECT * FROM users';

        db.query(query, (error, result) => {
            callback(error, result);
            console.log(result);
        });
    };

    let getUserLoginInfo = (user_name, callback) => {
        const queryString = "SELECT username, password,id FROM users WHERE username ='" + user_name + "'";
        db.query(queryString, (err, queryResult) => {
            console.log("inside user login info", queryResult);
            result = queryResult;
            callback(err, result);
        });
    };

    let getPersonality = (username, callback) => {
        let queryString = `SELECT personality FROM users WHERE username = '${username}'`;
        db.query(queryString, (err, queryResult) => {
            callback(err, queryResult);
        });
    }

    let addUser = (response, details, callback) => {
        let queryString = `SELECT username FROM users WHERE username = '${details.username}'`;
        db.query(queryString, (err, queryResult) => {

            if(queryResult.rows.length ===0){
                //proceed to push in details to users table
                let newquery = `INSERT into users(name,username,password,personality,photo_url)VALUES('${details.name}','${details.username}','${details.password}','${details.personality}','${details.photo_url}')`;
                db.query(newquery, (err,queryResult) =>{
                })
                response.redirect('/user/login');

            }else{
                response.render('signUp', { list: ['error'] });
            }
        });

    };

    let addBook = (username, isbnNumber, callback) =>{
        let queryString = `SELECT id FROM users WHERE username ='${username}'`;
        db.query(queryString,(err,queryResult) =>{
        // console.log("queryResult", queryResult.rows[0]);
        let id = queryResult.rows[0].id;
        let newString = `INSERT INTO book (owner_id,isbn) VALUES (${id},${isbnNumber})`
        db.query(newString,(err,queryResult)=>{
        });
        });
        // console.log("queryResult", queryResult);
        // console.log("isbnNumber", isbnNumber);
    };

    let getISBN = (id, callback) =>{
        let queryString = `SELECT isbn FROM book WHERE owner_id = ${id}`;
        db.query(queryString, (err,queryResult)=>{
            callback(err, queryResult);
            console.log(queryResult);
        });
    };


    return {
        getAll,
        getUserLoginInfo,
        getPersonality,
        addUser,
        addBook,
        getISBN
    };
};