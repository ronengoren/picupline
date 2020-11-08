import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import {List, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import auth from '@react-native-firebase/auth';

export default function MessagesScreen({navigation}) {
  useStatsBar('light-content');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(auth().currentUser);
  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('match', 'array-contains', user.uid)
      .onSnapshot((querySnapshot) => {
        const treads = querySnapshot.docs.map((doc) => {
          return {
            _id: doc.id,
            name: '',
            latestMessage: {
              text: '',
            },
            ...doc.data(),
          };
        });
        setChats(treads);

        if (loading) {
          setLoading(false);
        }
      });

    const chatQueryRes = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          // console.log(documentSnapshot.data());
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
        // console.log(threads);
        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={require('../assets/images/gradients/gradient_blue_white_topdown.png')}
      style={styles.bg}>
      <View style={styles.containerMessages}>
        <SafeAreaView style={{flex: 1, width: 380}}>
          <View style={styles.top}>
            <Text style={styles.title}>MESSAGES</Text>
          </View>
          <FlatList
            data={chats}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Room', {thread: item})}>
                <List.Item
                  title={item.name}
                  description={item.latestMessage.text}
                  titleNumberOfLines={1}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                  descriptionNumberOfLines={1}
                />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerMessages: {
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#EAE6DA',
  },
  bg: {
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
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
});
