
module.exports = (app, db) => {

  const book = require('./controllers/book')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */
    app.get('/user/login', book.loginForm);
    app.post('/user/login', book.loginCheck);
    app.get('/user/logout', book.logOut);
    app.get('/book', book.home);
    app.get('/user/signup', book.signUp);
    app.post('/user/signup', book.signUpCreate);
    //add a book to your library
    app.post('/book', book.addBook);
    // loads the users profile and library of books
    app.get('/user/profile', book.getProfile);
}