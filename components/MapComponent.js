import React, { Component } from 'react'
import MapView from 'react-native-maps';

export default class Map extends Component {    
    render() {    
      return (
        <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      );
    }
  }

  /* <Marker
            coordinate={{"latitude":"37° 32' 54.924''", "longitude":"122° 3' 30.924''"}}
            title="dsggds"
            description="sgdsgdgs"
            /> */
