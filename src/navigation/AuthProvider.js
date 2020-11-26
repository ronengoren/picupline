import React, {createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {Auth} from 'aws-amplify';
import * as Keychain from 'react-native-keychain';
import {onScreen, goBack} from '../constants';

/**
 * This provider is created
 * to access user in whole app
 */

const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [storageProfileImage, setStorageProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: async (username, password, updateAuthState, navigation) => {
          setError('');

          try {
            const user = await Auth.signIn(username, password);
            await Keychain.setInternetCredentials('auth', username, password);
            setLoading(false);

            console.log(' Success');
            updateAuthState('loggedIn');
            if (user) {
              console.log('userInfo');
              const session = await Auth.currentSession();
              const userInfo = session?.getIdToken().payload;

              console.log(userInfo);
              console.log('userInfo');
            }
            const userInfo = await Auth.currentAuthenticatedUser();
          } catch (error) {
            console.log(' Error signing in...', error);
          }
        },
        register: async (email, password) => {
          var gender = '';
          const value = await AsyncStorage.getItem('Gender');
          if (value == 0) {
            gender = 'Male';
          } else {
            gender = 'Female';
          }
          console.log(gender);
          var preferredGender = '';

          const prefGenderValue = await AsyncStorage.getItem(
            'Preferred Gender',
          );
          if (prefGenderValue == 0) {
            preferredGender = 'Male';
          }
          if (prefGenderValue == 1) {
            preferredGender = 'Female';
          } else {
            preferredGender = 'Both';
          }
          console.log(preferredGender);
          var dob = '';
          const getDob = await AsyncStorage.getItem('DOB');
          dob = getDob;
          console.log(dob);
          var profileImage = '';
          const getProfileImage = await AsyncStorage.getItem('Profile_Image');
          profileImage = getProfileImage;
          const filename = profileImage.substring(
            profileImage.lastIndexOf('/') + 1,
          );
          const uploadUri =
            Platform.OS === 'ios'
              ? profileImage.replace('file://', '')
              : profileImage;
          setUploading(true);
          setTransferred(0);

          // const pref = value.find(myFunction);
          // function myFunction(value, index, array) {
          //   // return value[0];
          //   console.log(value[1]);
          // }

          try {
            const response = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            const isNewUser = response.additionalUserInfo;
            const {uid} = response.user;

            const userData = {
              email,
              uid,
              gender,
              preferredGender,
              dob,
              profileImage,
              displayname: '',
              aboutMe: '',

              height: '',
              weight: '',
              role: '',
              bodyType: '',
              relationshipStatus: '',
              location: '',
              tribes: '',
              lookingFor: '',
              hivStatus: '',
              alcohol: '',
              diet: '',
              education: '',
              kids: '',
              language: '',
              music: '',
              pets: '',
              smoke: '',
              sport: '',
              tattoos: '',
              likes: [],
              notLike: [],
              superLike: [],
            };
            const task = storage()
              .ref('profileImages/' + filename)
              .putFile(uploadUri);

            // set progress state
            task.on('state_changed', (snapshot) => {
              setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
                  10000,
              );
            });
            await task;

            // console.log(uid);
            firestore()
              .collection('Users')
              .doc(`${userData.uid}`)
              .set(userData)
              .then(() => {
                console.log('user added');
              });
          } catch (e) {
            console.log(e);
          }
          setUploading(false);
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export {useAuth};
export default AuthProvider;
