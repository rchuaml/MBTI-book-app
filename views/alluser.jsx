var React = require("react");
var DefaultLayout = require ('./default');


class Home extends React.Component {
  render() {
let items = this.props.list.map(name => {
return <li>
<a href = {'/user/'+name.id} > <h6>{name.name}</h6></a>
 </li>
});


    return (
        <DefaultLayout>
      <html>
        <head/>
        <body>
        <h1> These are the list of Artists</h1>
        <h4>Click on the name to see artist info or delete</h4>
          <ol>
          {items}
          </ol>
        </body>
      </html>
      </DefaultLayout>
    );
  }
}

module.exports = Home;