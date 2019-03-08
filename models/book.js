var books = require('google-books-search');
const cookieParser = require('cookie-parser');

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

            if (queryResult.rows.length === 0) {
                //proceed to push in details to users table
                let newquery = `INSERT into users(name,username,password,personality,photo_url)VALUES('${details.name}','${details.username}','${details.password}','${details.personality}','${details.photo_url}')`;
                db.query(newquery, (err, queryResult) => {})
                response.redirect('/user/login');

            } else {
                response.render('signUp', { list: ['error'] });
            }
        });

    };

    let addBook = (response, username, inspected, callback) => {

        let queryString = `SELECT id FROM users WHERE username ='${username}'`;
        db.query(queryString, (err, queryResult) => {
            let id = queryResult.rows[0].id;
            let newString = `INSERT INTO book (google_id,owner_id,title,description,thumbnail) VALUES ('${inspected.id}',${id},'${inspected.title}', '${inspected.description}', '${inspected.thumbnail}')`;
            db.query(newString, (err, queryResult) => {
                response.redirect('/');
            });
        });
    };


    let getProfile = (request, response, callback) => {
        let userId = request.cookies.userId;
        let queryString = `SELECT * FROM book WHERE owner_id = '${userId}' ORDER by id`;
        db.query(queryString, (err, queryResult) => {
            console.log(queryResult.rows);
            response.render('library', { list: queryResult.rows });
        });
    };

    let editProfile = (request, response, parsedObject, percentage, callback) => {
        // let queryString = `INSERT into book WHERE id = `
        console.log("inside edit profile", parsedObject.id);
        let queryString = `UPDATE book SET progress = ${percentage} WHERE id = ${parsedObject.id}`;
        db.query(queryString, (err, queryResult) => {
            response.redirect('/user/profile');
        });
    };

    let deleteProfile = (response, parsedInfo, callback) => {
        let queryString = `DELETE from book WHERE id = ${parsedInfo.id}`;
        db.query(queryString, (err, queryResult) => {
            response.redirect('/user/profile');
        });
    };

    let getBook = (request,response, callback) =>{
        let id = request.params.id;
        let queryString = `SELECT * FROM book WHERE id = ${id}`;
        db.query(queryString, (err,queryResult) =>{
            response.render("bookView", {list : queryResult.rows});
        });
    };

    return {
        getAll,
        getUserLoginInfo,
        getPersonality,
        addUser,
        addBook,
        getProfile,
        editProfile,
        deleteProfile,
        getBook
    };
};