
module.exports = (app, db) => {

  const book = require('./controllers/book')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */
    // app.get('/', book.index);
    // app.post('/user/new', book.register);
    // app.post('/user/new', book.register);
    // app.get('/user/new', book.personality);
    // app.post('/user/new', book.logpersonality);
    // app.get('/user/login', book.loginForm);
    // app.post('/user/login', book.loginCheck);
    // app.get('/users/:id',book.display);
    app.get('/book', book.home);
    // app.get('/book/:id', book.info);
    // app.post('/book', book.);
}