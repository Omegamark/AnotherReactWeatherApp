import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import { Button, Card, Row, Col } from "react-materialize";

// Instantiate variables for use with GettingStartedGoogleMap
var currentLat;
var currentLong;

// *** May not need
// const googleMapURL =
//   "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: currentLat, lng: currentLong }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class GMap extends Component {
  constructor(props) {
    super(props);
    currentLat = this.props.currentLat;
    currentLong = this.props.currentLong;
    this.state = {
      markers: [
        {
          position: {
            lat: currentLat,
            lng: currentLong
          },
          key: `Colorado`,
          defaultAnimation: 2
        }
      ]
    };
    console.log("here is props", this.props);
  }

  render() {
    return (
      <GettingStartedGoogleMap
        containerElement={<div style={{}} />}
        mapElement={
          <div
            style={{
              minHeight: "16.5rem",
              maxHeight: "25rem",
              width: "auto"
            }}
          />
        }
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        onMarkerRightClick={this.handleMarkerRightClick}
      />
    );
  }
}

export default GMap;
