import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import calculatePortraitDimension from '../constants/calculatePortraitDimension';

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
export default function UsersGrid(props) {
  //   console.log(props.users);
  const [users, setUsers] = useState(props.users);
  const [onRefresh, setOnRefresh] = useState();
  const [hasError, setHasError] = useState();
  const [distance, setDistance] = useState(props.gender);
  onUserPressed = (item) => {
    console.log('user pressed', item);
    props.navigation.navigate('Profile', {itemId: item.uid});
  };
  const renderFooterComponent = () => {
    if (props.isLoading && !props.isRefreshing) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
  };
  renderEmptyView = () => {
    if (isLoading) {
      return null;
    }
    let text = '';
    if (!hasError) {
      text = 'No medical records have been found ';
    } else {
      text = 'An error occured please retry';
    }
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>{text}</Text>
      </View>
    );
  };

  getOnlineStatus = (onlineStatus) => {
    if (onlineStatus == 0)
      return <View style={[styles.statusMark, styles.offline]} />;
    else if (onlineStatus == 1)
      return <View style={[styles.statusMark, styles.online]} />;
    else if (onlineStatus == 2)
      return <View style={[styles.statusMark, styles.away]} />;
    else return <View style={[styles.statusMark, styles.offline]} />;
  };

  getDistanceView = (distance) => {
    return <Text style={styles.distance}>{distance + ' km'}</Text>;
  };
  getUserItem = (item) => {
    // console.log('item');

    // console.log(item);
    // console.log('item');

    return (
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => {
          onUserPressed(item);
        }}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{uri: item.uri}}
            defaultImage={require('../assets/images/defaultImage.png')}
            resizeMode="cover"
          />
          {getOnlineStatus(item.onlineStatus)}
          {getDistanceView(item.distance)}
          {item.role && item.role.abbreviatedName != '' && (
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: 'white',
                borderRadius: 12,
                position: 'absolute',
                right: 8,
                bottom: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Colors.red, fontWeight: 'bold'}}>
                {/* {item.role.abbreviatedName} */}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  renderItem = ({item}) => {
    return getUserItem(item);
  };
  renderUsersGrid = () => {
    return (
      <FlatList
        data={props.users}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComponent()}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        numColumns={3}
      />
    );
  };
  return <View style={styles.container}>{renderUsersGrid()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  separator: {
    height: 0.5,
    marginLeft: 64,
    backgroundColor: Colors.twitterLightBlue,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  headerView: {
    flex: 1,
    marginStart: 16,
    marginEnd: 16,
  },
  emptyView: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  name: {
    fontSize: 17,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: Colors.placeholderGrey30,
  },
  profileImage: {
    backgroundColor: 'black',
    height: deviceWidth / 3 - 1,
    width: deviceWidth / 3 - 1,
  },
  profileContainer: {
    height: deviceWidth / 3,
    width: deviceWidth / 3,
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  statusMark: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 0,
  },
  online: {
    backgroundColor: '#39b54a',
  },
  offline: {
    backgroundColor: '#808080',
  },
  away: {
    backgroundColor: '#f7931e',
  },
  distance: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
});
