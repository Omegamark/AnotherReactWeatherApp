import React, { Component } from "react";
import fetch from "node-fetch";

const Timer = ({}) => {
  // componentDidMount() {

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  // ** Must instiate the variable before using it with React, or possibly "use strict"
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var t;
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
      startTime();
    }, 500);
  }

  // Start the timer when component mounts
  // startTime();

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              I'm the timer component, please ignore me for now :)
            </span>
            <p>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively.
            </p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
