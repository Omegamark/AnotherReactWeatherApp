// Import components, CSS & libraries
import React, { Component } from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import Timer from "./components/timer";
import GMap from "./components/gmap";
import Demo from "./components/geoloc";
import cogLogo from "./cog.png";
// Object for updating the page background
import gifObject from "./js/gifObject";
import {
  Button,
  Card,
  Icon,
  CardTitle,
  CardPanel,
  Navbar,
  NavItem,
  Row,
  Col
} from "react-materialize";
import "./App.css";
import fetch from "node-fetch";
// Declare variables need for initial state
const apiKey = "5289bdc9d0f09cf2fce0fedd342c4c13";
// Base search on current Location
var currentLocation;

// Format Unix TimeStamp to work with Dark Sky API.
const currentTime =
  Math.ceil(Math.round(new Date().getTime() / 1000) / 10) * 10;
var apiUrl;

console.log("this is currentTime", currentTime);

// Was going to change the main background Image, but may not, depends on time.
var picObject = {
  darkClouds: "https://i.ytimg.com/vi/psEXd2_8yE8/maxresdefault.jpg"
};
console.log(gifObject.rain);
// Inline styling for changing the pages theme dynamically. Only adding background images now, but could do more.
var bgImage = "";
var cssClass = "";
var topCards = "";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      lat: null,
      long: null,
      summary: ""
    };
  }
  // Get the computer's current Location before the component mounts.
  componentWillMount() {
    // options for geolocation
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    // Function for successful geolocation
    function success(pos) {
      currentLocation = pos.coords;
      apiUrl = `https://api.darksky.net/forecast/${apiKey}/${currentLocation.latitude},${currentLocation.longitude},${currentTime}`;
      console.log("Your current position is:");
      console.log(`Latitude : ${currentLocation.latitude}`);
      console.log(`Longitude: ${currentLocation.longitude}`);
      console.log(`More or less ${currentLocation.accuracy} meters.`);
    }
    // function for geolocation error
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // Fetch the data from Dark Sky API
  async initialCall() {
    try {
      const res = await fetch(apiUrl);
      const ds = await res.json();

      // Initially centering around Cognizant, but have this update with the map later.
      let icon = ds.currently.icon;
      let lat = ds.latitude;
      let long = ds.longitude;
      let summary = ds.minutely.summary;
      console.log(icon);
      console.log(ds);
      // Change the background image based on the icon returned from dark sky.
      this.switchAppCss(icon);
      // Set the initial state (this will need to change map coords.)
      this.setState({
        icon,
        lat,
        long,
        summary
      });
      console.log(this.state);
    } catch (err) {
      console.error(err);
    }
    console.log(this.state);
    console.log(this.state.lat);
    console.log(this.state.summary);
  }

  // Render the page
  render() {
    return (
      <div className={cssClass}>
        <Navbar brand="logo" className="light-blue lighten-5 opacity" right>
          <NavItem href="get-started.html">
            <div className="blue-text">Getting started </div>
          </NavItem>
          <NavItem href="components.html">
            <div className="blue-text"> Components</div>
          </NavItem>
        </Navbar>
        <div className="">
          <Row>
            {/* This is the Map piece */}
            {this.state.lat && this.state.long
              ? <Col s={6} m={6} l={6}>
                  <CardPanel className="all-card-size">
                    <GMap
                      currentLat={this.state.lat}
                      currentLong={this.state.long}
                    />
                  </CardPanel>
                </Col>
              : <Col s={6} m={6} l={6}>
                  <CardPanel className="all-card-size">
                    <div> Click The Button </div>
                  </CardPanel>
                </Col>}

            {this.state.icon
              ? <Col s={6} m={6} l={6}>
                  <Card
                    className="all-card-size"
                    header={<CardTitle reveal image={bgImage} waves="light" />}
                    title={this.state.summary}
                    // actions={[
                    //   <Button className="activator">
                    //     <span>Testing</span>
                    //   </Button>
                    // ]}
                    reveal={
                      <p>
                        Here is some more information about this product that is
                        only revealed once clicked on.
                      </p>
                    }
                  />
                </Col>
              : <Col s={6} m={6} l={6}>
                  <Card
                    className="all-card-size"
                    header={<CardTitle image={cogLogo}>Card Title</CardTitle>}
                    // actions={[
                    //   <a className="btn activator">
                    //     <span className="activator">Testing </span>
                    //   </a>
                    // ]}
                    reveal={
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    }
                  />
                </Col>}
          </Row>
        </div>

        {/* <Timer /> */}
        <div className="center-button">
          <Button
            waves="light"
            onClick={event => {
              this.initialCall();
            }}
          >
            What's The Weather Here & Now?<Icon right>cloud</Icon>
          </Button>
        </div>
        <br />
        <div>
          <Row>
            <Col s={6} m={6} l={6}>
              <CardPanel className="all-card-size">
                <Demo />
              </CardPanel>
            </Col>
            <Col s={6} m={6} l={6}>
              <CardPanel className="all-card-size" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  // Switch statement to change the divs based on the weather icon.
  switchAppCss(icon) {
    switch (icon) {
      case "partly-cloudy-day":
        bgImage = gifObject.partlyCloudyDay;
        cssClass = "partly-cloudy-day";
        break;
      case "clear-day":
        bgImage = gifObject.clearDay;
        cssClass = "clear-day";
        break;
      case "cloudy":
        bgImage = gifObject.cloudy;
        cssClass = "cloudy";
        break;
      case "clear-night":
        bgImage = gifObject.clearNight;
        cssClass = "clear-night";
        break;
      case "partly-cloudy-night":
        bgImage = gifObject.partlyCloudyNight;
        cssClass = "partly-cloudy-night";
        break;
      case "rain":
        bgImage = gifObject.rain;
        cssClass = "rain";
        break;
      case "sleet":
        bgImage = gifObject.sleet;
        cssClass = "sleet";
        break;
      case "snow":
        bgImage = gifObject.snow;
        cssClass = "snow";
        break;
      case "wind":
        bgImage = gifObject.wind;
        cssClass = "wind";
        break;
      case "fog":
        bgImage = gifObject.fog;
        cssClass = "fog";
        break;
    }
  }
}

export default App;
