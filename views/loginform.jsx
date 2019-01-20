var React = require("react");
var DefaultLayout = require('./default');

class Signin extends React.Component {
  render() {
    if(this.props.list === undefined){
    return (
      <DefaultLayout>
          <form method="POST" action="/user/login">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </DefaultLayout>
    );
  }
    else if(this.props.list[0] === 'error'){
    return (
      <DefaultLayout>
      <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Error unable to login. Please double check again your username and password that you have input to see whether they are correct.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <form method="POST" action="/user/login">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </DefaultLayout>
    );
  }
  else if(this.props.list[0] === 'disabled'){
    return (
      <DefaultLayout>
      <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> System has checked you have already signed in.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <form method="POST" action="/user/login">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" readOnly required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" readOnly required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </DefaultLayout>
    );
  }
}
}

module.exports = Signin;