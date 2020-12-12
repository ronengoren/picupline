import React, {useState, useEffect} from 'react';
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
import Amplify, {API, graphqlOperation, Storage} from 'aws-amplify';
import {S3Image, S3Album} from 'aws-amplify-react-native';
import config from '../../aws-exports';

const {width: deviceWidth, height: deviceHeight} = calculatePortraitDimension();
const LATITUDE_DELTA = 25;
const LONGITUDE_DELTA = LATITUDE_DELTA * (deviceWidth / deviceHeight);
delta = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
DEFAULT_LOCATION = {
  latitude: 40.712776,
  longitude: -74.005974,
};
export default function UsersGrid(props) {
  const [users, setUsers] = useState();
  const [onRefresh, setOnRefresh] = useState();
  const [hasError, setHasError] = useState();
  const [distance, setDistance] = useState(props.gender);
  const [image, setImage] = useState();
  useEffect(() => {
    if (props.users) {
      setUsers(props.users);
    }
  });

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
    const signedURL = Storage.get(item.profileImage.key, {level: 'protected'})
      .then((url) => {
        var myRequest = new Request(url);
        fetch(myRequest).then(function (response) {
          if (response.status === 200) {
            setImage(response.url.split('?')[0]);
            console.log(image);
          }
        });
      })
      .catch((err) => console.log(err));

    // const image = Storage.get(item.profileImage.key);
    // const url = `https://${bucket}.s3.${region}.amazonaws.com/protected/${item.profileImage.key}`;
    // console.log(url);

    return (
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => {
          onUserPressed(item);
        }}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{uri: image}}
            defaultImage={require('../assets/images/defaultImage.png')}
            resizeMode="cover"
          />
          {/* <S3Image
            style={styles.profileImage}
            level="protected"
            imgKey={item.profileImage.key}
          /> */}
          {getOnlineStatus(item.onlineStatus)}
          {getDistanceView(item.distance)}
          {item.gender != '' && (
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
                {item.gender}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  renderItem = ({item}) => {
    // console.log(JSON.stringify(item, null, 2));

    return getUserItem(item);
  };
  renderUsersGrid = () => {
    return (
      <FlatList
        data={users}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComponent()}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={props.onRefresh}
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
