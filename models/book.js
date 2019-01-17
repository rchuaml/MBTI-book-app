var books = require('google-books-search');
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (db) => {

  let getAll = (callback) => {
    let query = 'SELECT * FROM users';

    db.query(query,  (error, result) => {
        callback(error, result);
        console.log(result);
    });
  };


  return {
    getAll,
    //get,
  };
};