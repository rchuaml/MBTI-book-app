var React = require("react");
var DefaultLayout = require ('./default');


class Home extends React.Component {


  render() {
let result = this.props.list[0];
let googleid = result.google_id;

    return (
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
          <link rel="stylesheet" type="text/css" href="/css/style.css" />

    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Google Books Embedded Viewer API Example</title>
    <script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script>
    <script type="text/javascript" src = "/js/app.js"></script>
  </head>
  <body>

    <div id="viewerCanvas"></div>
  </body>
</html>
    );
  }
}

module.exports = Home;