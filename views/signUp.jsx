var React = require("react");
var DefaultLayout = require('./default');

class NewUser extends React.Component {
  render() {
    if(this.props.list === undefined){
    return (
    <DefaultLayout>
    <h1> Create New User </h1>
        <form method="POST" action="/user/signup">
            <div className="form-group">
            <label>Display Name</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Display Name" required />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" required />
          </div>
                    <div className="form-group">
            <label for="exampleInputPassword1">Photo Url:</label>
            <input name="photo_url" type="photo_url" className="form-control" id="exampleInputPassword1" placeholder="Enter Photo Url" required />
          </div>
                    <div className="form-group">
        <label >Select Your Personality Type</label>

<select name="personality" class="custom-select custom-select-lg">
  <option value="INTJ">INTJ</option>
  <option value="INTP">INTP</option>
  <option value="ENTJ">ENTJ</option>
  <option value="ENTP">ENTP</option>

  <option value="INFJ">INFJ</option>
  <option value="INFP">INFP</option>
  <option value="ENFJ">ENFJ</option>
  <option value="ENFP">ENFP</option>

  <option value="ISTJ">ISTJ</option>
  <option value="ISFJ">ISFJ</option>
  <option value="ESTJ">ESTJ</option>
  <option value="ESFJ">ESFJ</option>

  <option value="ISTP">ISTP</option>
  <option value="ISFP">ISFP</option>
  <option value="ESTP">ESTP</option>
  <option value="ESFP">ESFP</option>
</select>
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </DefaultLayout>
            );
        }else if(this.props.list[0] === 'error'){
    return (
            <DefaultLayout>
<h1> Create New User </h1>
      <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Username already exists in system! Please pick another username!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

<form method="POST" action="/user/signup">
            <div className="form-group">
            <label>Display Name</label>
            <input name="name" type="text" className="form-control" placeholder="Enter Display Name" required />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" required />
          </div>
                    <div className="form-group">
            <label for="exampleInputPassword1">Photo Url:</label>
            <input name="photo_url" type="photo_url" className="form-control" id="exampleInputPassword1" placeholder="Enter Photo Url" required />
          </div>
                    <div className="form-group">
        <label >Select Your Personality Type</label>

<select name="personality" class="custom-select custom-select-lg">
  <option value="INTJ">INTJ</option>
  <option value="INTP">INTP</option>
  <option value="ENTJ">ENTJ</option>
  <option value="ENTP">ENTP</option>

  <option value="INFJ">INFJ</option>
  <option value="INFP">INFP</option>
  <option value="ENFJ">ENFJ</option>
  <option value="ENFP">ENFP</option>

  <option value="ISTJ">ISTJ</option>
  <option value="ISFJ">ISFJ</option>
  <option value="ESTJ">ESTJ</option>
  <option value="ESFJ">ESFJ</option>

  <option value="ISTP">ISTP</option>
  <option value="ISFP">ISFP</option>
  <option value="ESTP">ESTP</option>
  <option value="ESFP">ESFP</option>
</select>
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </DefaultLayout>
             );
        }
    }
}

module.exports = NewUser;