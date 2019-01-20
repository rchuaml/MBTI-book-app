var React = require("react");
var DefaultLayout = require('./default');

class Home extends React.Component {
    render() {
        // console.log(this.props.list[0]);
        // let industry = this.props.list[0].industryIdentifiers[0].identifier;
        // console.log(industry);

        let items = this.props.list.map((name, index) => {
            return <div>
            <div id={"myModal"+ index} className="modal fade bd-example-modal-xl text-dark" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header ">
        <h5 class="modal-title ">{name.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
        <img className = "float-left" src = {name.thumbnail}/>
        <div>
        <p>Rating: {name.averageRating}/5</p>
        <p>Number of Ratings: {name.ratingsCount}</p>
        <h6>Description:</h6>
        <hr/>
        <p>{name.description}</p>
        <form className="spacer" action="/book" method="post">
  <input type="hidden"name = "isbn" value= {JSON.stringify(name)} />
   <input className="submit" type="submit" value="Add to library" />
   </form>

        </div>
        </div>
      </div>
      </div>
    </div>
  </div>

            <div classname = "col-2">
<div id = "textbox">
<h6>{name.title}</h6>
</div>
<img src = {name.thumbnail}data-toggle="modal" data-target={"#myModal"+ index}/>
<h1>{index + 1}</h1>
 </div>
 </div>
        });


        return (
            <DefaultLayout>
      <html>
        <head />
        <body>
        <h1> These is the list of book recommendations for your personality</h1>
        <h4>Click on the image to see more info about book</h4>
<div class="container">
  <div class="row">

          {items}
</div>
</div>

        </body>
      </html>
      </DefaultLayout>


        );
    }
}
module.exports = Home;