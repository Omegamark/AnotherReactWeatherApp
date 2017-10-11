// Import components, CSS & libraries
import React, { Component } from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import Timer from "./components/timer";
import GMap from "./components/gmap";
import Demo from "./components/geoloc";
import biu from "./assets/biuSquaredSVG.png";
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
import "./css/app.css";
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
var background = "";
var cards = "";

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
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: new Headers({ "Access-Control-Allow-Origin": "*" }),
        mode: "no-cors",
        cache: "default"
      });
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
      <div
        className={
          this.state.icon
            ? background
            : "container center-cards common-background"
        }
      >
        <Navbar brand="Another React Weather App" className="transparent" right>
          <NavItem href="get-started.html">
            <div className="blue-text">Getting started </div>
          </NavItem>
          <NavItem href="components.html">
            <div className="blue-text"> Components</div>
          </NavItem>
        </Navbar>
        <div>
          <Row>
            {/* This is the Map piece */}
            {this.state.lat && this.state.long ? (
              <Col s={6} m={6} l={6}>
                <CardPanel
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
                >
                  <GMap
                    currentLat={this.state.lat}
                    currentLong={this.state.long}
                  />
                </CardPanel>
              </Col>
            ) : (
              <Col s={6} m={6} l={6}>
                <CardPanel
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
                >
                  <div> Click The Button </div>
                </CardPanel>
              </Col>
            )}

            {this.state.icon ? (
              <Col s={6} m={6} l={6}>
                <Card
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
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
            ) : (
              <Col s={12} m={6}>
                <Card
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
                  header={
                    <CardTitle reveal image={biu}>
                      <div className="blue-text">
                        This Card Triggers a Modal!
                      </div>
                    </CardTitle>
                  }
                  // actions={[
                  //   <a className="btn activator">
                  //     <span className="activator">Testing </span>
                  //   </a>
                  // ]}
                  reveal={
                    <p>
                      Hey! if you clicked on this it means you are interacting
                      with this app. Please take a look at my personal website
                      at therealmarkgrant.com.
                    </p>
                  }
                />
              </Col>
            )}
          </Row>
          <Row>
            <Col s={12}>
              <div className="center-button">
                <a
                  className={this.state.icon ? cssClass : "btn blue"}
                  onClick={event => {
                    this.initialCall();
                  }}
                >
                  Click Me!
                </a>
              </div>
            </Col>
          </Row>

          <div>
            <Row>
              <Col s={12} m={6}>
                <CardPanel
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
                >
                  <Demo />
                </CardPanel>
              </Col>
              <Col s={12} m={6}>
                <CardPanel
                  className={
                    this.state.icon ? cards : "all-card-size common-cards"
                  }
                >
                  <p>
                    You'll be able to select a time with this panel...
                    eventually
                  </p>
                </CardPanel>
              </Col>
            </Row>
          </div>
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
        background = "container center-cards clear-day-background";
        cards = "clear-day-cards all-card-size";
        break;
      case "cloudy":
        bgImage = gifObject.cloudy;
        cssClass = "cloudy";
        break;
      case "clear-night":
        bgImage = gifObject.clearNight;
        cssClass = "clear-night";
        background = "clear-night-background";
        cards = "clear-night-cards all-card-size";
        break;
      case "partly-cloudy-night":
        bgImage = gifObject.partlyCloudyNight;
        cssClass = "partly-cloudy-night";
        background = "partly-cloudy-night-background";
        cards = "partly-cloudy-night-cards all-card-size";
        break;
      case "rain":
        bgImage = gifObject.rain;
        cssClass = "rain";
        break;
      case "sleet":
        bgImage = gifObject.sleet;
        cssClass = "sleet";
        background = "sleet-background";
        cards = "sleet-cards all-card-size";
        break;
      case "snow":
        bgImage = gifObject.snow;
        cssClass = "snow";
        background = "snow-background";
        cards = "snow-cards all-card-size";
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
