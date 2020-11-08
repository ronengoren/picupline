import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Divider, Text, Avatar, Accessory} from 'react-native-elements';
import Layout from '../constants/Layout';
import {HomeScreenPics} from '../constants/Pics';
import {randomNo} from '../utils/randomNo';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Gallery from '../components/Gallery';
import ImagePicker from 'react-native-image-crop-picker';
import {getFilePathFromLocalUri} from '../infra/utils';
import storage from '@react-native-firebase/storage';
import Demo from '../constants/demo';
import ProfileItem from '../components/ProfileItem';
import Colors from '../constants/Colors';
import {
  translateDate,
  getBirthdateMinMax,
  getAge,
} from '../infra/utils/dateTimeUtils';

const {pic, title} = HomeScreenPics[randomNo(1, HomeScreenPics.length)];

const Social = ({name}) => (
  <Icon
    name={name}
    type="ionicon"
    containerStyle={styles.iconContainer}
    size={32}
  />
);
const DIMENSION_WIDTH = Dimensions.get('window').width;

export default function ProfileScreen({navigation, route}) {
  // const {navigate} = props.navigation;
  const [userDetails, setUserDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [user, setUser] = useState(auth().currentUser);
  const [imageURI, setImageURI] = useState(null);
  const [chatRoom, setChatRoom] = useState([]);

  const {
    age,
    pic,
    info1,
    info2,
    info3,
    info4,
    info5,
    info6,
    info7,
    info8,
    info9,
    info10,
    inf11,
    location,
    match,
    name,
  } = Demo[7];
  var userid = user.uid;
  React.useEffect(() => {
    if (route.params?.itemId) {
      userid = route.params.itemId;
      // console.log(route.params.userInfo.displayname);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.itemId]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userid)
      .onSnapshot((querySnapshot) => {
        let info = [];
        let newUserDetails = querySnapshot.data();
        let avatarFile = querySnapshot.data().profileImage;
        const filename = avatarFile.substring(avatarFile.lastIndexOf('/') + 1);
        const reference = storage().ref('profileImages' + '/' + filename);
        // setAvatar(avatarFile);
        setUserDetails(newUserDetails);
        // console.log(getAge(userDetails.dob));
        // console.log(userDetails.profileImage);
        reference
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            setProfileImageUrl({uri: url});
          })
          .catch((e) =>
            console.log('getting downloadURL of image error => ', e),
          );
        // console.log('avatarFile');
        // console.log(newUserDetails);
        // console.log('avatarFile');
      });
  }, []);

  useEffect(() => {
    // const user = auth().currentUser;

    firestore()
      .collection('posts')
      .where('uid', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        // let posts = querySnapshot.docs.map((doc) => doc.data());
        let posts = querySnapshot.docs.map((doc) => doc.data());
        let images = posts.map((item) => {
          return item.postPhoto;
        });
        setImages(images);
        // console.log(urlImages(images));

        // setIsRefreshing(false);
        // setLoading(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        // setIosImage(image.sourceURL);
        // setAndroidImage(image.path);
        // console.log('received image', image);
        setImage({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        const localuri = getFilePathFromLocalUri(image.path);
        setAvatar(localuri);

        // console.log('image');

        // console.log(localuri);

        // console.log('image');
        onSubmit(localuri);
        // console.log(androidImage);
        // console.log('image');
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message ? e.message : e);
      });
  };
  const onSubmit = async (localuri) => {
    let user = auth().currentUser;
    console.log(localuri);
    try {
      firestore().collection('Users').doc(user.uid).update({
        profileImage: localuri,
      });
      setAvatar(localuri);
      // navigation.navigate('Profile', {profileImage: avatar});
    } catch (e) {
      console.error(e);
    }
  };
  async function onMessage(params) {
    const threadref = firestore().collection('THREADS');
    // console.log('current user');
    // console.log(user.uid);
    // console.log(params.userDetails.uid);
    const snapshot = await threadref
      .where('chatId', '==', params.senderId + params.userDetails.uid)
      .get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    } else {
      const threads = await snapshot.docs.map((doc) => {
        console.log(doc.data());
        // return {
        //   _id: doc.id,
        //   ...doc.data(),
        // };
      });
      // const threadRoom = await threads.forEach((doc) => {
      //   setChatRoom(doc);
      // });
    }

    // navigation.navigate('Room', {thread: chatRoom});
    // firestore()
    //   .collection('THREADS')
    //   .add({
    //     name: params.userDetails.displayname,
    //     sender: params.senderId,
    //     recipient: params.userDetails.uid,
    //     chatId: params.senderId + params.userDetails.uid,
    //     match: [params.senderId, params.userDetails.uid],
    //     latestMessage: {
    //       text: `You have joined the room ${params.userDetails.displayname}.`,
    //       createdAt: new Date().getTime(),
    //     },
    //   })
    //   .then((docRef) => {
    //     // console.log(docRef);

    //     docRef.collection('MESSAGES').add({
    //       text: `You have joined the room ${params.userDetails.displayname}.`,
    //       createdAt: new Date().getTime(),
    //       system: true,
    //     });
    //     navigation.navigate('Messages');
    //   });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/homeTab/homeTabGradient.png')}
        style={styles.container}>
        <ImageBackground
          source={profileImageUrl}
          style={styles.photo}></ImageBackground>
        <ProfileItem
          matches={match}
          name={userDetails.displayname}
          age={getAge(userDetails.dob)}
          location={userDetails.location}
          info1={userDetails.aboutMe}
          info2={userDetails.alcohol}
          info3={userDetails.bodyType}
          info4={userDetails.diet}
          info5={userDetails.education}
          info6={userDetails.height}
          info7={userDetails.weight}
          info8={userDetails.hivStatus}
          info9={userDetails.kids}
          info10={userDetails.language}
          info11={userDetails.lookingFor}
          info12={userDetails.music}
          info13={userDetails.pets}
          info14={userDetails.relationshipStatus}
          info15={userDetails.role}
          info16={userDetails.smoke}
          info17={userDetails.sport}
          info18={userDetails.tattoos}
          info19={userDetails.tribes}
        />

        <View style={styles.actionsProfile}>
          {user.uid == userDetails.uid ? (
            <TouchableOpacity
              style={styles.circledButton}
              onPress={() =>
                navigation.navigate('EditProfile', {
                  userDetails: user.uid,
                  profileImage: profileImageUrl,
                })
              }>
              <Text style={styles.iconButton}>
                <Icon name="md-options" size={18} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.roundedButton}
              onPress={() => {
                onMessage({userDetails: userDetails, senderId: user.uid});
              }}>
              <Text style={styles.iconButton}>
                <Icon name="md-chatbubbles" size={15} />
              </Text>
              <Text style={styles.textButton}>Start Chatting</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
    color: 'black',
  },
  separator: {
    backgroundColor: 'grey',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
  },
  add: {
    backgroundColor: '#939393',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#481380',
  },
  buttonText: {
    color: '#ffe2ff',
    fontSize: 24,
    marginRight: 5,
  },
  containerProfileItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {height: 0, width: 0},
  },
  photo: {
    width: DIMENSION_WIDTH,
    height: 250,
  },
  actionsProfile: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7444C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  iconButton: {
    fontFamily: Colors.medium,
    fontSize: 40,
    color: '#FFFFFF',
  },
  roundedButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5636B8',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textButton: {
    fontFamily: Colors.medium,
    fontSize: 15,
    color: '#FFFFFF',
    paddingLeft: 5,
  },
});
