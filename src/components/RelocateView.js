import React, {useState, useContext, useEffect} from 'react';

import {Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import MapView, {Marker} from 'react-native-maps';
import calculatePortraitDimension from '../constants/calculatePortraitDimension';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width: deviceWidth, height: deviceHeight} = calculatePortraitDimension();
const LATITUDE_DELTA = 25;
const LONGITUDE_DELTA = LATITUDE_DELTA * (deviceWidth / deviceHeight);
delta = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

DEFAULT_LOCATION = {
  latitude: 40.712776,
  longitude: -74.005974,
};
const RelocateView = (props) => {
  // console.log(props.location.longitude);
  const [region, setRegion] = useState(props.location);
  const renderTopSection = () => {
    return (
      <View
        style={{
          height: 92,
          alignSelf: 'stretch',
          justifyContent: 'center',
          marginHorizontal: 16,
          marginTop: 16,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed={null}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('search result', details.geometry.location);
            // setRegion({
            //   longitude: details.geometry.location.lng,
            //   latitude: details.geometry.location.lat,
            //   latitudeDelta: LATITUDE_DELTA,
            //   longitudeDelta: LONGITUDE_DELTA,
            // });
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              backgroundColor: 'white',
            },
          }}
          query={{
            key: '',
            language: 'en',
          }}
          nearByPlaceApi="GooglePlacesSearch"
          debounce={200}
        />
      </View>
    );
  };
  const onRelocate = () => {
    const body = {
      id: user.uid,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    this.props.dispatch(changeLocation(body));
    this.props.dispatch(enableLocation(true));
    if (props.onRelocate) {
      props.onRelocate(region);
    }
  };
  const renderBottomSecton = () => {
    return (
      <View
        style={{
          height: 92,
          alignSelf: 'stretch',
          justifyContent: 'flex-end',
          marginHorizontal: 16,
        }}>
        <Button
          secondary
          style={{
            alignSelf: 'stretch',
            marginBottom: 8,
            marginTop: 16,
            marignLeft: 0,
            marginRight: 0,
          }}
          title={'RELOCATE'}
          textColor={'white'}
          bgColor={Colors.red10}
          // onPress={() => {
          //   onRelocate();
          // }}
        />
        <Text
          style={[styles.description, {marginBottom: 32, textAlign: 'center'}]}>
          By clicking
          <Text style={{fontSize: 11, color: Colors.pinkRed}}> Relocate</Text>,
          your home page will feature users near your new location
        </Text>
      </View>
    );
  };
  const onPressMap = (event) => {
    let region = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      ...delta,
    };
    setRegion(region);
  };
  // console.log(region);
  return (
    <View style={styles.container}>
      {/* <MapView
        ref={(ref) => {
          this.map = ref;
        }}
        region={{...region}}
        style={styles.map}
        onPress={onPressMap}
        onRegionChange={(region) => {
          delta = {
            longitudeDelta: region.latitudeDelta * (deviceWidth / deviceHeight),
            latitudeDelta: region.latitudeDelta,
          };
        }}></MapView> */}

      {renderTopSection()}

      {renderBottomSecton()}
    </View>
  );
};

export default RelocateView;

RADIUS = 250000;

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  map: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  marker: {
    width: 32,
    height: 32,
  },

  background: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  description: {
    fontSize: 10,
    color: Colors.apricot,
  },

  text: {
    fontSize: 17,
    color: '#353535',
  },
});

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];
