import React, { Component } from "react";
// Import components, CSS & libraries
// import Timer from "./components/timer";
// import GMap from "./components/gmap";
import Demo from "./components/geoloc";
import cogLogo from "./cog.png";
import "./App.css";
import fetch from "node-fetch";
// Declare variables need for initial state
const apiKey = "5289bdc9d0f09cf2fce0fedd342c4c13";
const cogLat = "40.016457";
const cogLong = "-105.285884";
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
var divStyle = {
  background: "",
  backgroundColor: "white",
  height: "150px",
  padding: "20px",
  backgroundSize: "cover"
};
console.log(divStyle.backgroundImage);
var appCssStyle = "";
var appHeaderCssStyle = "";
var defaultCssStyle = "App-header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      lat: null,
      long: null
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
      let dynamicLat = ds.latitude;
      let dynamicLong = ds.longitude;
      console.log(icon);
      console.log(ds);
      // Change the background image based on the icon returned from dark sky.
      this.switchAppCss(icon);
      // Set the initial state (this will need to change map coords.)
      this.setState({
        icon: icon,
        lat: currentLocation.latitude,
        long: currentLocation.longitude,
        summary: ds.minutely.summary
      });
    } catch (err) {
      console.error(err);
    }
    console.log(this);
  }

  // Render the page
  render() {
    return (
      <div className="App">
        {this.state.icon
          ? <div style={divStyle}>
              <img src={cogLogo} className="App-logo" alt="logo" />
              <h2>
                Wonder no more:
                {" " + this.state.summary}
              </h2>
            </div>
          : <div className="App-header">
              <img src={cogLogo} className="App-logo" alt="logo" />
              <h2>Curious about the outdoors?</h2>
            </div>}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <button
          onClick={event => {
            this.initialCall();
          }}
        >
          What's The Weather Here & Now?
        </button>

        {/* <Timer /> */}
        {/* <GMap /> */}
        <Demo />
      </div>
    );
  }

  // Switch statement to change the divs based on the weather icon.
  switchAppCss(icon) {
    switch (icon) {
      case "partly-cloudy-day":
        divStyle.backgroundImage = `url(${gifObject.partlyCloudyDay})`;
        break;
      case "clear-day":
        divStyle.backgroundImage = `url(${gifObject.clearDay})`;
        break;
      case "cloudy":
        divStyle.backgroundImage = `url(${gifObject.cloudy})`;
        break;
      case "clear-night":
        divStyle.backgroundImage = `url(${gifObject.clearNight})`;
        break;
      case "partly-cloudy-night":
        divStyle.backgroundImage = `url(${gifObject.partlyCloudyNight})`;
        break;
      case "rain":
        divStyle.backgroundImage = `url(${gifObject.rain})`;
        break;
      case "sleet":
        divStyle.backgroundImage = `url(${gifObject.sleet})`;
        break;
      case "snow":
        divStyle.backgroundImage = `url(${gifObject.snow})`;
        break;
      case "wind":
        divStyle.backgroundImage = `url(${gifObject.wind})`;
        break;
      case "fog":
        divStyle.backgroundImage = `url(${gifObject.fog})`;
        break;
    }
  }
}

export default App;
