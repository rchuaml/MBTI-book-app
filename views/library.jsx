var React = require("react");
var DefaultLayout = require('./default');


class Home extends React.Component {
    render() {

        // let industry = this.props.list[0].industryIdentifiers[0].identifier;
        // console.log(industry);

        let items = this.props.list.map((name, index) => {
            return <div>
            <div id={"myModal"+ index} className="modal fade bd-example-modal-xl text-dark" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header ">
        <h5 class="modal-title ">{name.title} - {name.progress} % Done</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div>
        <img className = "float-left" src = {name.thumbnail}/>
        <div>
        <h6 >Description:</h6>
        <hr/>
        <p>{name.description}</p>
        <form className="spacer" action="/user/profile/delete?_method=DELETE" method="post">
<div className = "float-left float-bottom">
<input type = "hidden" name = "info" value = {JSON.stringify(name)}/>
<button type="submit" class="btn btn-danger">Delete this book</button>
    </div>
    </form>
        <form className="spacer" action="/user/profile/edit?_method=PUT" method="post">
<div className = "float-right">
<p>Edit reading progress for this book (%)</p>
    <input type = "hidden" name = "list" value ={JSON.stringify(name)}/>
  <input type="text" classname = "input-sm" name = "percent" />
   <input className="submit" type="submit" />
   </div>
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
<img src = {name.thumbnail}data-toggle="modal" data-target={"#myModal"+ index} className = "zoom"/>
<h1>{index + 1}</h1>
<h5>Progress = {name.progress} %</h5>
 </div>
 </div>
        });


        return (
            <DefaultLayout>
      <html>
        <head />
        <body>
        <h1> This is your Library</h1>
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