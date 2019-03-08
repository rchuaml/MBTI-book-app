var React = require('react');
import React, { Component } from 'react';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
<link href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan|Bungee+Inline|Bungee+Shade|Candal|Faster+One|Fredericka+the+Great" rel="stylesheet"/>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <title>MBTI book reccomendation app</title>
        </head>
        <header>

        </header>
        <body className="container-fluid">
        <nav>
            <ul className="navbar relative-top">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
                <li className="nav-item">
                <a className="nav-link" href="/user/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/signup">Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/logout">Logout</a>
              </li>

            </ul>
        </nav>
            <div className="container mx-auto my-auto">

                  {this.props.children}

            </div>
        <footer className="navbar">
            Copyright 2019 <span> </span>
            Created with &hearts; by Ronnie Chua<span> </span>
            Github: <a href = "https://github.com/rchuaml">@https://github.com/rchuaml </a>
        </footer>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;