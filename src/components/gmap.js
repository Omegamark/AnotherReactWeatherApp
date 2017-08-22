import React, { Component } from "react";
import fetch from "node-fetch";

class GMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherCondition: null,
      lat: null,
      long: null
    };
  }
  render() {
    return <p>Hello from GMap</p>;
  }
}

export default GMap;
