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
import {User} from '../constants/User';

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
  const currentUser = auth().currentUser;
  const ref = firestore().collection('Users');
  const totalUsers = firestore()
    .collection('Users')
    .get()
    .then((querySnapshot) => {
      setTotals(querySnapshot.size);
    });

  const Users = () => {
    const usersList = users.map((number) => number);
    console.log(total);
    return (
      <View style={styles.grid}>
        <Text h2 h2Style={styles.h2Style}>
          {total} Top Picks
        </Text>
        <Text h4 h4Style={styles.h4Style}>
          Featured profiles of the day, picked just for you
        </Text>

        {usersList.map(({id, email, name}, i) => (
          <Tile
            // imageSrc={pic}
            activeOpacity={0.9}
            title={name}
            titleStyle={styles.title}
            caption={email}
            captionStyle={styles.caption}
            featured
            key={id}
          />
        ))}
      </View>
    );
  };

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {email, name} = doc.data();
        // console.log(email, name);
        list.push({
          id: doc.id,
          name,
          email,
        });
      });
      setUsers(list);
    });
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
