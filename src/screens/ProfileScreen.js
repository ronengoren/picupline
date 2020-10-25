import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
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

const {pic, title} = HomeScreenPics[randomNo(1, HomeScreenPics.length)];

const Social = ({name}) => (
  <Icon
    name={name}
    type="ionicon"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

export default function ProfileScreen({navigation, route}) {
  // const {navigate} = props.navigation;
  const [userDetails, setUserDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const [user, setUser] = useState(auth().currentUser);
  // React.useEffect(() => {
  //   if (route.params?.avatar) {
  //     // console.log(route.params);
  //     setAvatar(route.params.avatar);
  //     // console.log(avatar);
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //   }
  // }, [route.params?.avatar]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot((querySnapshot) => {
        let info = [];
        let newUserDetails = querySnapshot.data();
        let avatarFile = querySnapshot.data().profileImage;
        const filename = avatarFile.substring(avatarFile.lastIndexOf('/') + 1);
        const reference = storage().ref('profileImages' + '/' + filename);

        // setAvatar(avatarFile);
        setUserDetails(newUserDetails);

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
        // console.log(profileImageUrl);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, styles.bordered]}>
        <View>
          <Avatar
            rounded
            source={profileImageUrl}
            size="xlarge"
            style={{width: 100, height: 100}}
          />
          <View style={styles.add}>
            <TouchableOpacity onPress={() => pickSingle(false)}>
              <Icon name="pencil" width={20} height={20} fill="#111" />
            </TouchableOpacity>
          </View>
        </View>
        <Text category="h6" style={styles.name}>
          {userDetails.gender}
        </Text>
      </View>
      <View style={[styles.userInfo, styles.bordered]}>
        <View style={styles.section}>
          <Text category="s1" style={styles.space}>
            {images.length}
          </Text>
          <Text appearance="hint" category="s2">
            Posts
          </Text>
        </View>
        <View style={styles.section}>
          <Text category="s1" style={styles.space}>
            0
          </Text>
          <Text appearance="hint" category="s2">
            Followers
          </Text>
        </View>
        <View style={styles.section}>
          <Text category="s1" style={styles.space}>
            0
          </Text>
          <Text appearance="hint" category="s2">
            Following
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {/* <Button
          title="LOGOUT"
          style={styles.button}
          appearance="ghost"
          status="danger"
          onPress={this.handleSignout}></Button> */}
        <View style={styles.separator} />
        {/* <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          title="MESSAGE"></Button> */}
      </View>
      {/* <Gallery items={images} /> */}
    </SafeAreaView>
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
});

// export default function (props) {
//   const navigation = useNavigation();

//   return <ProfileScreen {...props} navigation={navigation} />;
// }

{
  /* <View style={styles.imageContainer}>
        <Image source={pic} style={styles.image} />
      </View>
      <Text h4 style={styles.name}>
        {user.email}
      </Text>
      <Text style={styles.desc}> {user.uid}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>
        I love to travel. I have a cat named pickles. If he likes you, I
        probably will too.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>Find me on Social here</Text>
      <View style={styles.socialLinks}>
        <Social name="logo-snapchat" />
        <Social name="logo-instagram" />
        <Social name="logo-facebook" />
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('EditProfile')}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View> */
}
