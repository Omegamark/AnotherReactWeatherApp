// Switch statement to change the divs based on the weather icon.
const switchAppCss = {
  switchAppCss: function(icon) {
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
};
export default switchAppCss;
