var React = require("react");
var DefaultLayout = require('./default');



class Home extends React.Component {
    render() {
        // console.log(this.props.list.images);
        let items = this.props.list.map((name, index) => {
            console.log(name.industryIdentifiers);
            return <div>
            <div id={"myModal"+ index} className="modal fade bd-example-modal-xl text-dark" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
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
        <p>{name.description}</p>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>

            <div classname = "col-2">
<div id = "textbox">
<a href = {"/book/" + index+1}> <h6>{name.title}</h6></a>
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
        <h1> These are the list of book recommendations</h1>
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