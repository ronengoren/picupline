import React, {useMemo, useReducer, useContext} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import Layout from '../constants/Layout';
import {HomeScreenPics} from '../constants/Pics';
import {randomNo} from '../utils/randomNo';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

const {pic, title} = HomeScreenPics[randomNo(1, HomeScreenPics.length)];

const Social = ({name}) => (
  <Icon
    name={name}
    type="ionicon"
    containerStyle={styles.iconContainer}
    size={32}
  />
);
export default function ProfileScreen({navigation}) {
  // const {navigate} = props.navigation;

  const user = auth().currentUser;

  // console.log(navigation);
  // const user = state.user;
  // console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={pic} style={styles.image} />
      </View>
      <Text h4 style={styles.name}>
        {user.email}
      </Text>
      <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
