import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";
// Using a provided style to save time
// import "../App.css";

class Demo extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
              <h5>These are your current coordinates:</h5>
              <table className="fix-table">
                <tbody>
                  <tr>
                    <td className="fix-table-data">latitude: </td>
                    <td className="fix-table-data">
                      {this.props.coords.latitude}
                    </td>
                  </tr>
                  <tr>
                    <td className="fix-table-data">longitude: </td>
                    <td className="fix-table-data">
                      {this.props.coords.longitude}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>altitude</td>
                    <td>
                      {this.props.coords.altitude}
                    </td>
                  </tr>
                  <tr>
                    <td>heading</td>
                    <td>
                      {this.props.coords.heading}
                    </td>
                  </tr>
                  <tr>
                    <td>speed</td>
                    <td>
                      {this.props.coords.speed}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          : <div>Getting the location data&hellip; </div>;
  }
}

// Demo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);
// Using ES6 object spread syntax
Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

export default geolocated()(Demo);
