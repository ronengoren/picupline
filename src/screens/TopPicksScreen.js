import React, {useState, useContext, useEffect, useReducer} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Text, Tile} from 'react-native-elements';
//libraries
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Swiper from 'react-native-deck-swiper';
import Geolocation from '@react-native-community/geolocation';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery, getNames} from 'aws-amplify-react-hooks';
//components
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import HorizontalUserList from '../components/HorizontalUserList';
import UsersGrid from '../components/UsersGrid';
import UserSearchView from '../components/UserSearchView';
import RelocateView from '../components/RelocateView';
//style
import Colors from '../constants/Colors';
//navigation
import {goHome, onScreen, goBack} from '../constants';
import AuthStack from '../navigation/AuthStack';
import Routes from '../navigation';
import {AuthContext} from '../navigation/AuthProvider';
//aws
import {Auth} from 'aws-amplify';
import Amplify, {API, graphqlOperation, Storage} from 'aws-amplify';
// import {User} from '../../models';
import {listUsers} from '../../graphql/queries';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

const initialState = {
  users: [],
};

export default function TopPicksScreen({props, navigation, updateAuthState}) {
  const [users, setUsers] = useState([]);
  const [qlusers, setQlUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [total, setTotals] = useState('');
  const [searchon, setSearchon] = useState(false);
  const [locationon, setLocationon] = useState(false);
  const [eyeon, setEyeon] = useState(false);
  const [filteron, setFilteron] = useState(false);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState();
  const [imageURI, setImageURI] = useState(null);
  const [onlineBit, setOnlineBit] = useState(0);
  const [latitude, setLatitude] = useState();
  const [gridType, setGridType] = useState('nearby');
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [altitude, setAltitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const [Flag, setFlag] = useState(false);
  const currentUser = auth().currentUser;
  // const ref = firestore().collection('Users');
  const {logout} = useContext(AuthContext);
  const owner = Auth.user.attributes.sub;

  useEffect(() => {
    getUserInfo();
    fetchUsers();
    // console.log(response);
    // loadUsers();
    // findCoordinates();
    // onRefreshUsers();
  }, []);

  async function loadUsers() {
    console.log('loadUsers');
    const productData = await API.graphql({query: listUsers});
    const products = await Promise.all(
      productData.data.listUsers.items.map(async (product) => {
        const image = await Storage.get(product.profileImage.key, {
          level: 'protected',
        });

        product.s3Image = image;
        // const filendsame = image.substring(image.lastIndexOf('/') + 1);
        // console.log(image);

        return product;
      }),
    );
    // console.log(products);
    // Storage.get(item.profileImage.key, {
    //   level: 'protected',
    // })
    //   .then((url) => {
    //     var myRequest = new Request(url);
    //     fetch(myRequest).then(function (response) {
    //       // console.log('response');

    //       // console.log(response.name);
    //       // console.log('response');

    //       if (response.status === 200) {
    //         setImage(url);
    //         // console.log(image);
    //       }
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  async function fetchUsers() {
    try {
      setLoading(true);

      const userData = await API.graphql(graphqlOperation(listUsers));
      const usersList = userData.data.listUsers.items;
      setUsers(usersList);
      // console.log(users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error fetching data');
    }
  }

  async function getUserInfo() {
    const userInfo = await Auth.currentAuthenticatedUser();
    // const userData = await AsyncStorage.getItem('userInfo');
    // console.log(userInfo);
    // console.log('current user info in TopPicksScreen');
    setUserInfo(userInfo);
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition((info) => setLocation(info.coords));
    // setAltitude(location.altitude);
    // setLongitude(location.longitude);
  };

  const onLocation = (locationon) => {
    if (!locationon) {
      setIsVisibleMap(!isVisibleMap);
      setOnline(!locationon);
    }

    if (locationon && isVisibleMap) {
      setIsVisibleMap(false);
      setOnline(false);

      changeWithCurrentLocation();
    }
    if (locationon && !isVisibleMap) {
      setOnline(false);

      changeWithCurrentLocation();
    }
  };

  const onEyePress = (eyeon, locationon) => {
    if (!eyeon && locationon) {
      changeWithCurrentLocation();
    }
    if (!eyeon && isVisibleMap) {
      setIsVisibleMap(false);
      setEyeon(!eyeon);
    }
  };

  const changeWithCurrentLocation = () => {
    console.log(location.altitude);
    const body = {
      id: user.uid,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    setLocation(body);
  };

  const onFilterPress = (filteron, locationon) => {
    if (!filteron && locationon) {
      changeWithCurrentLocation();
    }
    if (!filteron && isVisibleMap) {
      setIsVisibleMap(false);
      setFilteron(!filteron);
    }

    if (!filteron) {
      navigation.navigate('Filters', {loading, filteron});
    }
  };

  const onSearchPress = () => {
    if (searchon == false && online == false) {
      setSearchon(true);
    } else {
      setOnline(false);
      setSearchon(false);
    }
    // setSearchon(true);
    // else setOnline(false);
  };

  const getTopToolBar = (searchon, locationon, eyeon, filteron, online) => {
    return (
      <View style={styles.topToolbarContainer}>
        <View style={{width: 40, height: 40, marginLeft: 8}}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={onSearchPress}>
            <Image
              style={styles.icon}
              source={
                searchon || online
                  ? require('../assets/images/searchon.png')
                  : require('../assets/images/searchoff.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              marginRight: 16,
            }}
            onPress={() => {
              onLocation(locationon);
            }}>
            <Image
              style={styles.icon}
              source={
                locationon || isVisibleMap
                  ? require('../assets/images/locationon.png')
                  : require('../assets/images/locationoff.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              marginRight: 16,
            }}
            onPress={() => {
              onEyePress(eyeon, locationon);
            }}>
            <Image
              style={styles.icon}
              source={
                eyeon
                  ? require('../assets/images/eyeon.png')
                  : require('../assets/images/eyeoff.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
            }}
            onPress={() => {
              onFilterPress(filteron, locationon);
            }}>
            <Image
              style={styles.icon}
              source={
                filteron
                  ? require('../assets/images/filteron.png')
                  : require('../assets/images/filteroff.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onRefreshUsers = () => {
    const {filteron, eyeon, locationon, filters, online} = users;
    if (filteron) {
      let data = {
        id: owner,
        limit: 40,
        offset: 0,
        online: online,
      };
    } else if (eyeon) {
      let data = {
        id: owner,
        limit: 40,
        offset: 0,
        online: online,
      };
    } else if (locationon) {
      fetchNearByUsers(online);
    } else {
      fetchNearByUsers(online);
    }
  };
  const fetchNearByUsers = (online) => {
    if (!currentUser) {
      return;
      // console.log('currentUser', currentUser);
    }
    let data = {
      id: currentUser.uid,
      limit: 60,
      offset: 0,
      online: online ? 1 : 0,
    };
    // console.log('fetchNearByUsers', data);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {getTopToolBar(searchon, locationon, eyeon, filteron, online)}
        <View style={styles.content}>
          {/* <HorizontalUserList
            userType={'topUsers'}
            showType={'horizontal'}
            navigation={navigation}
            users={users}
            onRefresh={() => {
              fetchUsers();
            }}
          /> */}
          <UsersGrid
            onRefresh={() => {
              fetchUsers();
            }}
            users={users}
            navigation={navigation}
          />
          {searchon && <UserSearchView users={users} navigation={navigation} />}
          {isVisibleMap && (
            <RelocateView
              onRelocate={() => {
                setIsVisibleMap(false);
              }}
              location={location}
              navigation={navigation}
            />
          )}
        </View>
        <Button
          title="Sign Out"
          color="tomato"
          onPress={() => logout(updateAuthState)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  containerHome: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  top: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#363636',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMatches: {
    color: '#363636',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  h2Style: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  h4Style: {
    textAlign: 'center',
    color: '#757575',
  },
  grid: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    backgroundColor: 'black',
    marginBottom: -2,
    padding: 10,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    backgroundColor: 'black',
    marginTop: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  topToolbarContainer: {
    height: 60,
    alignSelf: 'stretch',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
