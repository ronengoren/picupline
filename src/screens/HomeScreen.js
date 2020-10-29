import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import Swiper from 'react-native-deck-swiper';
import {HomeScreenPics} from '../constants/Pics';
import {Card} from '../components/Card';
import PinchableBox from '../components/PinchableBox';
import {
  Divider,
  Text,
  Avatar,
  Accessory,
  Image,
  ListItem,
} from 'react-native-elements';
import storage from '@react-native-firebase/storage';

export default function HomeScreen({navigation}) {
  useStatsBar('light-content');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([null]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [avatarStorage, setAvatarStorage] = useState([null]);

  /**
   * Fetch threads from Firestore
   */
  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    if (posts.length < 10) {
      try {
        fetchPosts();
        setIsRefreshing(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false);
    }
  }, [isRefreshing]);

  fetchPosts = async () => {
    await firestore()
      .collection('posts')
      .get()
      .then((querySnapshot) => {
        let posts = querySnapshot.docs.map((doc) => doc.data());
        // console.log(posts);

        setPosts(posts);
        setLoading(false);
        // avatarImage(postsId);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  function avatarImage(params) {
    for (let i = 0; i < params.length; i++) {
      const userDocument = firestore()
        .collection('Users')
        .doc(params[i])
        .onSnapshot((documentSnapshot) => {
          const profileImage = documentSnapshot.data().profileImage;
          const filename = profileImage.substring(
            profileImage.lastIndexOf('/') + 1,
          );
          const reference = storage().ref('profileImages' + '/' + filename);
          // console.log(filename);
          reference
            .getDownloadURL()
            .then((url) => {
              // console.log('images');
              // console.log(url);
              // console.log('images');
              //from url you can fetched the uploaded image easily
              setAvatarStorage({uri: url});
              // console.log(avatarStorage);
            })
            .catch((e) =>
              console.log('getting downloadURL of image error => ', e),
            );
        });
    }
  }

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <PinchableBox imageUri={item.postPhoto} />
      <View style={styles.cardHeader}>
        <Text category="s1" style={styles.cardTitle}>
          {item.uid}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {itemId: item.uid})}>
          <Avatar
            rounded
            source={{
              uri:
                'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            }}
            size="xlarge"
            style={{width: 50, height: 50, marginRight: 16}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text category="p2">{item.postDescription}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {posts ? (
        <FlatList
          style={styles.container}
          data={posts}
          renderItem={renderItem}
          keyExtractor={posts.id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>I</Text>
      )}
      {/* <SafeAreaView style={styles.container}>
        <Swiper
          cards={HomeScreenPics}
          renderCard={Card}
          infinite // keep looping cards infinitely
          backgroundColor="white"
          cardHorizontalMargin={0}
          stackSize={2} // number of cards shown in background
        />
      </SafeAreaView> */}
      {/* <FlatList
        data={threads}
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
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 25,
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: 'black',
  },
  cardAvatar: {
    marginRight: 16,
  },
  cardContent: {
    padding: 10,
    borderWidth: 0.25,
    borderColor: 'black',
  },
});
