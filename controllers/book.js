var books = require('google-books-search');
var options = {
    // key: "YOUR API KEY",
    field: 'title',
    offset: 0,
    limit: 40,
    type: 'books',
    order: 'relevance',
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

const home = (request, response) => {
    // db.book.getAll((error, result) => {
    //     response.render('alluser', {list: result.rows});
    // })
    books.search("Mystery", options, function(error, results, apiResponse) {
    if ( ! error ) {
        var searchresults = results;
        console.log(searchresults);
        } else {
        console.log(error);
    }
    response.render('booklist', {list: searchresults});
});
  }




  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home
  };

};