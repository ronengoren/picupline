import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
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

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

export default function TopPicksScreen({props}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [total, setTotals] = useState('');

  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState();
  const [imageURI, setImageURI] = useState(null);

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
    console.log(users);
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
    return () => unsubscribe();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/gradients/gradient_blue.png')}
      style={styles.bg}></ImageBackground>
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
});
