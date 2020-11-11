import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import {TopPicksScreenPics} from '../constants/Pics';
import {useAuth} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Demo from '../constants/demo';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import Colors from '../constants/Colors';
import Swiper from 'react-native-deck-swiper';
import HorizontalUserList from '../components/HorizontalUserList';
import UsersGrid from '../components/UsersGrid';
import UserSearchView from '../components/UserSearchView';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

export default function TopPicksScreen({props, navigation}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [total, setTotals] = useState('');
  const [searchon, setSearchon] = useState(false);
  const [locationon, setLocationon] = useState(false);
  const [eyeon, setEyeon] = useState(false);
  const [filteron, setFilteron] = useState(false);
  const [online, setOnline] = useState(false);

  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState();
  const [imageURI, setImageURI] = useState(null);
  const [onlineBit, setOnlineBit] = useState(0);
  const [gridType, setGridType] = useState('nearby');
  const [isVisibleMap, setIsVisibleMap] = useState();
  const currentUser = auth().currentUser;
  const ref = firestore().collection('Users');
  const totalUsers = firestore()
    .collection('Users')
    .get()
    .then((querySnapshot) => {
      setTotals(querySnapshot.size);
      // setAvatars(querySnapshot.docs);
    });

  const Users = () => {
    const usersList = users.map((item, index) => item);

    return (
      <CardStack
        loop={true}
        verticalSwipe={false}
        renderNoMoreCards={() => null}
        ref={(swiper) => (this.swiper = swiper)}
        onSwiped={() => console.log('onSwiped')}
        onSwipedLeft={() => console.log('onSwipedLeft')}
        onSwipedRight={() => console.log('onRightLeft')}>
        {usersList.map((profile, i) => (
          <Card key={i}>
            <CardItem
              image={{uri: profile.uri}}
              name={profile.gender}
              matches={'44'}
              titleStyle={styles.title}
              description={profile.email}
              captionStyle={styles.caption}
              actions
              onPressLeft={() => this.swiper.swipeLeft(console.log('left'))}
              onPressRight={() => this.swiper.swipeRight(console.log('right'))}
            />
          </Card>
        ))}
      </CardStack>
    );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  loadUsers = () => {
    let list = [];

    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      let usersLists = querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const {
          uid,
          email,
          profileImage,
          gender,
          dob,
          preferredGender,
          uri,
        } = doc.data();

        const filename = profileImage.substring(
          profileImage.lastIndexOf('/') + 1,
        );
        const ref = storage().ref('profileImages/' + filename);
        ref.getDownloadURL().then((uri) => {
          list.push({
            uid,
            email,
            gender,
            dob,
            preferredGender,
            uri,
          });
          setUsers(list);
          // console.log(users);
          // setUsers(list);
        });
      });

      if (loading) {
        setLoading(false);
      }
    });

    /**
     * unsubscribe listener
     */
    // return () => unsubscribe();
  };
  const onLocation = (locationon) => {
    if (!locationon) {
      setIsVisibleMap({isVisibleMap: !isVisibleMap});
      this.props.dispatch(enableLocation(!locationon));
    }

    if (locationon && isVisibleMap) {
      setIsVisibleMap({isVisibleMap: false});

      this.props.dispatch(enableLocation(false));
      changeWithCurrentLocation();
    }
    if (locationon && !isVisibleMap) {
      this.props.dispatch(enableLocation(false));
      changeWithCurrentLocation();
    }
  };

  const onEyePress = (eyeon, locationon) => {
    if (!eyeon && locationon) {
      changeWithCurrentLocation();
    }
    if (!eyeon && isVisibleMap) setIsVisibleMap({isVisibleMap: false});

    this.props.dispatch(enableEye(!eyeon));
  };

  const changeWithCurrentLocation = () => {
    const body = {
      id: user.uid,
      // latitude: auth.currentLocation.latitude,
      // longitude: auth.currentLocation.longitude,
    };

    this.props.dispatch(changeLocation(body));
  };

  const onFilterPress = (filteron, locationon) => {
    if (!filteron && locationon) {
      changeWithCurrentLocation();
    }
    if (!filteron && this.state.isVisibleMap)
      setIsVisibleMap({isVisibleMap: false});

    this.props.dispatch(enableFilter(!filteron));
    if (!filteron) {
      this.props.navigation.navigate('UserFilter');
    }
  };

  const getTopToolBar = (searchon, locationon, eyeon, filteron, online) => {
    return (
      <View style={styles.topToolbarContainer}>
        <View style={{width: 40, height: 40, marginLeft: 8}}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={this.onSearchPress}>
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
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {getTopToolBar(searchon, locationon, eyeon, filteron, online)}
        <View style={styles.content}>
          <HorizontalUserList
            userType={'topUsers'}
            showType={'horizontal'}
            navigation={navigation}
            users={users}
            // onRefresh={() => {
            //   loadUsers();
            // }}
          />
          <UsersGrid
            // onRefresh={() => {
            //   loadUsers();
            // }}
            users={users}
            navigation={navigation}
          />
          {searchon && <UserSearchView navigation={navigation} />}
          {isVisibleMap && (
            <RelocateView
              onRelocate={() => {
                setState({isVisibleMap: false});
              }}
              location={this.props.auth.currentLocation}
              navigation={navigation}
            />
          )}
        </View>
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
