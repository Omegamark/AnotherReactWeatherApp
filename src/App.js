import React, { Component } from "react";
// Import components, CSS & libraries
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import Timer from "./components/timer";
import GMap from "./components/gmap";
import Demo from "./components/geoloc";
import cogLogo from "./cog.png";
import { Button, Card, Icon, CardTitle, Row, Col } from "react-materialize";
// import "./App.css";
import fetch from "node-fetch";
// Declare variables need for initial state
const apiKey = "5289bdc9d0f09cf2fce0fedd342c4c13";
// Base search on current Location
var currentLocation;

// console.log("this is your current position", currentLocation);
// const time = "409467600";
// Format Unix TimeStamp to work with Dark Sky API.
const currentTime =
  Math.ceil(Math.round(new Date().getTime() / 1000) / 10) * 10;
var apiUrl;

console.log("this is currentTime", currentTime);
// Object for updating the page background
const gifObject = {
  rain: "https://media.giphy.com/media/OvFQrZk8b5N0Q/source.gif",
  snow: "https://media.giphy.com/media/boqxHlnQOnpeg/giphy.gif",
  sleet: "https://media.giphy.com/media/jrAjSZWmHVcaY/giphy.gif",
  fog: "https://media.giphy.com/media/RI42LtoMA5mxi/giphy.gif",
  wind: "https://media.giphy.com/media/HZg3yWfUYvBAI/giphy.gif",
  cloudy: "http://media.giphy.com/media/HoUgegTjteXCw/giphy.gif",
  clearDay: "https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif",
  clearNight: "https://media.giphy.com/media/tWy79PNXSFJQY/giphy.gif",
  partlyCloudyDay: "https://media.giphy.com/media/G1T5M0qT6ZJlu/giphy.gif",
  partlyCloudyNight:
    "https://media.giphy.com/media/3o6Zt93byJYeHqvrwc/giphy.gif"
};
// Was going to change the main background Image, but may not, depends on time.
var picObject = {
  darkClouds: "https://i.ytimg.com/vi/psEXd2_8yE8/maxresdefault.jpg"
};
console.log(gifObject.rain);
// Inline styling for changing the pages theme dynamically. Only adding background images now, but could do more.
var bgImage = "";

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
      <div className="App">
        {this.state.icon
          ? <div>
              <Row>
                <Col s={4} m={4} l={4}>
                  <Card
                    header={<CardTitle reveal image={bgImage} waves="light" />}
                    title={this.state.summary}
                    reveal={
                      <p>
                        Here is some more information about this product that is
                        only revealed once clicked on.
                      </p>
                    }
                  />

                  {/* <Card
                    className="small"
                    header={
                      <CardTitle image={bgImage}>
                        {this.state.summary}
                      </CardTitle>
                    }
                  /> */}
                </Col>
              </Row>
            </div>
          : <Col s={4} m={4} l={4}>
              <Card
                className="small"
                header={<CardTitle image={cogLogo}>Card Title</CardTitle>}
                actions={[<a href="#">This is a Link</a>]}
              >
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </Card>
            </Col>}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

        {/* <Timer /> */}
        <Button
          waves="light"
          onClick={event => {
            this.initialCall();
          }}
        >
          What's The Weather Here & Now?<Icon right>cloud</Icon>
        </Button>
        <div>
          <Row>
            <Col s={4} m={4} l={4}>
              <Card>
                <Demo />
              </Card>
            </Col>
            {this.state.lat && this.state.long
              ? <Col s={4} m={4} l={4}>
                  <Card>
                    <GMap
                      currentLat={this.state.lat}
                      currentLong={this.state.long}
                    />
                  </Card>
                </Col>
              : <Col s={4} m={4} l={4}>
                  <div> Click The Button </div>
                </Col>}
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
        break;
      case "clear-day":
        bgImage = gifObject.clearDay;
        break;
      case "cloudy":
        bgImage = gifObject.cloudy;
        break;
      case "clear-night":
        bgImage = gifObject.clearNight;
        break;
      case "partly-cloudy-night":
        bgImage = gifObject.partlyCloudyNight;
        break;
      case "rain":
        bgImage = gifObject.rain;
        break;
      case "sleet":
        bgImage = gifObject.sleet;
        break;
      case "snow":
        bgImage = gifObject.snow;
        break;
      case "wind":
        bgImage = gifObject.wind;
        break;
      case "fog":
        bgImage = gifObject.fog;
        break;
    }
  }
}

export default App;
