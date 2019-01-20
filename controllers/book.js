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
                        response.redirect('/book')
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
        response.redirect('/book');
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
                    response.render('booklist', { list: searchresults });
                });
            });

        } else {
            response.redirect('/user/login');
        }
    };

    let addBook = (request, response) => {
        var inspected = JSON.parse(request.body.isbn);
        // console.log(inspected);
        if (inspected.industryIdentifiers !== undefined) {
            var isbnNumber = inspected.industryIdentifiers[0].identifier;
        } else {
            response.send('Error: ISBN Code not available! Book is not available to be added to be added to your library! <a href = "/book">try again</a> and select another book');
        }
        var username = request.cookies.username;
        db.book.addBook(username, isbnNumber, (error, result) => {});
        response.redirect('/book');
    };

    let getProfile = (request, response) => {
        var id = request.cookies.userId;
        db.book.getISBN(id, (error, result) => {
            console.log(result.rows);

            var newoptions = {
                // key: "YOUR API KEY",
                field: 'isbn',
                offset: 0,
                limit: 40,
                type: 'books',
                order: 'newest',
                lang: 'en'
            };
            //how to push the array only after array has been pushed
            var promises = [];
            for (var i = 0; i < result.rows.length; i++) {
                books.search(result.rows[i].isbn, newoptions, function(error, results, apiResponse) {
                    if (!error) {
                        const promise = results[0];
                        promises.push(promise);
                    } else {
                        console.log(error);
                    }
                    // response.render('booklist', { list: searchresults });
                });
            }
            Promise.all(promises).then(results => {
                console.log("promises", results);
            });
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
        getProfile
    };

};