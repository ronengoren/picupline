import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
  Alert,
  Pressable,
} from 'react-native';
import {List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';
import useStatsBar from '../../utils/useStatusBar';
import Swiper from 'react-native-deck-swiper';
import {HomeScreenPics} from '../../constants/Pics';
// import {Card} from '../../components/Card';
import PinchableBox from '../../components/PinchableBox';
import {
  Divider,
  Text,
  Avatar,
  Accessory,
  Image,
  ListItem,
} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
// import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tile} from 'react-native-elements';
import Layout from '../../constants/Layout';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../../components/City';
import Filters from '../../components/Filters';
import CardItem from '../../components/CardItem';
import TinderCard from 'react-tinder-card';
import Draggable from 'react-native-draggable';
import SwipeCardContainer from '../../components/SwipeCardComponent/SwipeCardContainer';
import auth from '@react-native-firebase/auth';
import {Overlay, Button} from 'react-native-elements';
import UserFilter from './UserFilter';

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49; // found from https://stackoverflow.com/a/50318831/6141587

export default function HomeScreen({navigation}) {
  useStatsBar('light-content');
  const [visible, setVisible] = useState(false);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([null]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [avatarStorage, setAvatarStorage] = useState([null]);
  const [usersThreads, setUsersThreads] = useState([]);
  const [count, setCount] = useState(0);
  const ref = firestore().collection('Users');
  const currentUser = auth().currentUser;

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    let list = [];
    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      const usersLists = querySnapshot.docs.map((doc) => {
        if (doc.id !== currentUser.uid) {
          const {
            uid,
            email,
            profileImage,
            dob,
            preferredGender,
            gender,
            uri,
          } = doc.data();
          const filename = profileImage.substring(
            profileImage.lastIndexOf('/') + 1,
          );
          const ref = storage().ref('profileImages/' + filename);
          ref.getDownloadURL().then((uri) => {
            list.push({uid, email, dob, preferredGender, uri, gender});
            setUsersThreads(list);
            // console.log(usersThreads);
            // setUsers(list);
          });
        }
        // console.log(doc.id);
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
  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    if (posts.length < 10) {
      try {
        // fetchPosts();
        setIsRefreshing(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false);
    }
  }, [isRefreshing]);

  if (loading) {
    return <Loading />;
  }
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const renderItem = ({item}) => (
    <View style={styles.card}>
      {/* <PinchableBox imageUri={item.profileImage} /> */}
      <View style={styles.cardHeader}>
        <Text category="s1" style={styles.cardTitle}>
          {item.email}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {itemId: item.uid, userInfo: item})
          }>
          <Avatar
            rounded
            source={{uri: item.uri}}
            size="xlarge"
            style={{width: 50, height: 50, marginRight: 16}}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
          <View style={styles.button}>
            <Text>{count}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.cardContent}>
        <Text category="p2">{item.postDescription}</Text>
      </View>
    </View>
  );

  const putLike = () => {
    return Alert.alert('I like someone!');
  };

  const putNope = () => {
    return Alert.alert('I nope someone!');
  };

  const putSuperLike = () => {
    return Alert.alert('I superlike someone!');
  };

  return (
    <View style={styles.containerHome}>
      <View style={styles.card}>
        <SwipeCardContainer usersThreads={usersThreads} />
      </View>
      <View style={styles.buttons}>
        <City />
        <Button title="Filter" onPress={toggleOverlay} />

        {/* <Pressable onPress={putNope}>
          <Image
            source={require('../../assets/images/cross.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable onPress={putSuperLike}>
          <Image
            source={require('../../assets/images/star.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable onPress={putLike}>
          <Image
            source={require('../../assets/images/heart.png')}
            style={styles.button}
          />
        </Pressable> */}
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.imageContainer}>
        <UserFilter />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
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

  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: 'black',
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
  imageContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 6,
    borderRadius: 20,
    overflow: 'hidden', // this does magic
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 30,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  containerHome: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  top: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexBasis: '85%',
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttons: {
    flexBasis: '15%',
    backgroundColor: 'yellow',
    marginTop: 10,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});
