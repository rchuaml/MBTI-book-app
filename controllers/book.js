const sha256 = require('js-sha256');
var books = require('google-books-search');
var util = require('util');
var Promise = require('promise');

var options = {
    // key: "YOUR API KEY",
    field: 'subject',
    offset: 0,
    limit: 40,
    type: 'books',
    order: 'newest',
    lang: 'en'
};


module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    // let index = (request, response) => {
    //     // db.pokemon.getAll((error, allPokemon) => {
    //     //   response.render('pokemon/index', { allPokemon });
    //     // });
    //     response.send("Hello World!");
    // };


    let loginForm = (request, response) => {
        if (request.cookies.loggedin !== undefined) {
            response.render('loginform', { list: ['disabled'] });
        } else {
            response.render('loginform');
        }
    };

    let loginCheck = (request, response) => {
        let user_name = request.body.username;
        db.book.getUserLoginInfo(user_name, (error, result) => {
            console.log("inside result", result);
            if (result.rows.length === 0) {
                response.render('loginform', { list: ['error'] });
            } else if (result.rows.length > 0) {
                if (error) {
                    console.log('query err', error.message);
                } else {
                    let hashedPassword = result.rows[0].password;
                    let hashedInputPassword = sha256(request.body.password + 'SALT');
                    console.log("this is the hashed input password", hashedInputPassword);
                    let hashedName = sha256(user_name + 'SALT');
                    if (hashedPassword === hashedInputPassword) {
                        response.cookie('loggedin', 'true');
                        response.cookie('username', user_name);
                        response.cookie('userId', result.rows[0].id);
                        response.redirect('/')
                    } else {
                        response.render('loginform', { list: ['error'] });

                    }
                }
            }
        });

    };

    let logOut = (request, response) => {
        response.clearCookie('loggedin');
        response.clearCookie('username');
        response.clearCookie('userId');
        response.redirect('/');
    }

    let signUp = (request, response) => {
        if (request.cookies.loggedin !== true) {
            response.render('signUp');
        }
    }

    let signUpCreate = (request, response) => {
        db.book.addUser(response, request.body, (error, result) => {
            console.log(result.rows);

            //  else {
            //     response.render('signUp', { list: ['error'] });
            // }
        });
    }

    let home = (request, response) => {
        if (request.cookies.loggedin === 'true') {
            let username = request.cookies.username;
            db.book.getPersonality(username, (error, result) => {
                var personality = result.rows[0].personality;
                var genreRecco = "";

                if (personality === "INFP") {
                    genreRecco = "fantasy";
                } else if (personality === "ENFP") {
                    genreRecco = "short+stories";
                } else if (personality === "INTP") {
                    genreRecco = "science+fiction";
                } else if (personality === "INTJ") {
                    genreRecco = "science";
                } else if (personality === "ENTJ") {
                    genreRecco = "biography";
                } else if (personality === "INFJ") {
                    genreRecco = "speculative+fiction";
                } else if (personality === "ENFJ") {
                    genreRecco = "literary+fiction";
                } else if (personality === "ENTP") {
                    genreRecco = "crimes";
                } else if (personality === "ISTJ") {
                    genreRecco = "historical+fiction";
                } else if (personality === "ESTJ") {
                    genreRecco = "autobiography";
                } else if (personality === "ESFJ") {
                    genreRecco = "history";
                } else if (personality === "ISFP") {
                    genreRecco = "urban+fantasy";
                } else if (personality === "ESFP") {
                    genreRecco = "classics";
                } else if (personality === "ISTP") {
                    genreRecco = "western";
                } else if (personality === "ESTP") {
                    genreRecco = "technology";
                } else if (personality === "ISFJ") {
                    genreRecco = "adventure";
                }

                books.search(genreRecco, options, function(error, results, apiResponse) {
                    if (!error) {
                        var searchresults = results;
                    } else {
                        console.log(error);
                    }
                    response.render('booklist', { list: searchresults, person: personality });
                });
            });

        } else {
            response.redirect('/user/login');
        }
    };

    let addBook = (request, response) => {
        console.log(request.body);
        var inspected = JSON.parse(request.body.isbn);
        var username = request.cookies.username;
        db.book.addBook(response, username, inspected, (error, result) => {});
    };

    let getProfile = (request, response) => {
        db.book.getProfile(request, response, (error, result) => {});
    };

    let getBook = (request,response) => {
        db.book.getBook(request,response, (error, result) => {
        });
    };

    let editProfile = (request, response) => {
        console.log(request.body);
        parsedObject = JSON.parse(request.body.list);
        percentage = parseInt(request.body.percent);
        db.book.editProfile(request, response, parsedObject, percentage, (error, result) => {});
    };

    let deleteProfile = (request, response) =>{
        parsedInfo = JSON.parse(request.body.info);
                // console.log(parsedInfo);
        db.book.deleteProfile(response, parsedInfo, (error,result) => {
        });
    };





    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        home,
        loginForm,
        loginCheck,
        logOut,
        signUp,
        signUpCreate,
        addBook,
        getProfile,
        editProfile,
        deleteProfile,
        getBook
    };

};