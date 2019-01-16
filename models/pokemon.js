/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {
    pool.query('SELECT * FROM artists ORDER BY id', (err, artistResult) => {
        if (err) {
            console.log(err);
        }
        let artist = {};
        artist.artlist = [];
        artist.artlist = artistResult.rows;
        // console.log(artist);

        // respond with HTML page displaying all pokemon
        res.render('home', artist);
    });
  };

  return {
    getAll,
    //get,
  };
};