import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import {TopPicksScreenPics} from '../constants/Pics';
import {useAuth} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

export default function TopPicksScreen({props}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
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
    const usersList = users.map((number) => number);

    console.log(usersList);

    return (
      <View style={styles.grid}>
        <Text h2 h2Style={styles.h2Style}>
          {total} Top Picks
        </Text>
        <Text h4 h4Style={styles.h4Style}>
          Featured profiles of the day, picked just for you
        </Text>

        {usersList.map(
          ({id, email, profileImage, dob, gender, preferredGender, uri}, i) => (
            <Tile
              imageSrc={{uri: uri}}
              activeOpacity={0.9}
              title={gender}
              titleStyle={styles.title}
              caption={email}
              captionStyle={styles.caption}
              featured
              key={id}
            />
          ),
        )}
      </View>
    );
  };

  function Filename(params) {
    const urlparams = params.substring(params.lastIndexOf('/') + 1);
    return urlparams;
  }

  function RefURL(params) {
    return storage().ref('profileImages' + '/' + params);
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {
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
        return ref.getDownloadURL().then((uri) => {
          list.push({
            id: doc.id,
            profileImage,
            email,
            dob,
            gender,
            preferredGender,
            uri,
          });

          // setImageURI({uri: uri});
        });
      });
    });
    setUsers(list);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Users />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
