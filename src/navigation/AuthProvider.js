import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect,
} from 'react';
//firebase
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
//navigation
import {onScreen, goBack} from '../constants';
//libraries
import uuid from 'uuid';
import {DataStore} from '@aws-amplify/datastore';
import Amplify, {API, graphqlOperation, Storage, Auth} from 'aws-amplify';
import {useMutation} from 'aws-amplify-react-hooks';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
//aws
import config from '../../aws-exports';
import {createUser} from '../../graphql/mutations';

// import * as mutations from '../../graphql/mutations';
// import {User} from '../../models';
// import {listUsers} from '../../graphql/queries';
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
/**
 * This provider is created
 * to access user in whole app
 */
const initialState = {
  users: [],
};
const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

export const AuthContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERS':
      return {...state, users: action.users};
    case 'ADD_USER':
      return {...state, users: [action.user, ...state.users]};
    default:
      return state;
  }
}

export const AuthProvider = ({children}) => {
  const [check, setOwner] = useState(false);
  const [input, setJob] = useState({
    description: '',
  });
  const [user, setUser] = useState(null);
  const [storageProfileImage, setStorageProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mimeType, setMimeType] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFileName, setImageFileName] = useState(null);

  const [users, setUsers] = useState([]);

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
              const session = await Auth.currentSession();
              const userInfo = session?.getIdToken().payload;
            }
            const userInfo = await Auth.currentAuthenticatedUser();
          } catch (error) {
            console.log(' Error signing in...', error);
          }
        },
        register: async (
          email,
          username,
          password,
          updateAuthState,
          navigation,
        ) => {
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
          const getProfileImageMime = await AsyncStorage.getItem(
            'Profile_Image_Mime',
          );
          setMimeType(getProfileImageMime);
          profileImage = getProfileImage;
          const filename = profileImage.substring(
            profileImage.lastIndexOf('/') + 1,
          );
          const visibility = 'private';
          const extension = filename.split('.')[1];
          const key = `/images/${uuid()}${username}.${extension}`;
          const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          const file = {
            key: key,
            bucket: config.aws_user_files_s3_bucket,
            region: config.aws_project_region,
          };
          const newUserData = {
            username,
            email,
            gender,
            preferredGender,
            dob,
            profileImage: file,
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

          const uploadUri =
            Platform.OS === 'ios'
              ? profileImage.replace('file://', '')
              : profileImage;
          setUploading(true);
          setTransferred(0);
          try {
            await Auth.signUp({username, password, attributes: {email}});
            console.log(' Sign-up Confirmed');

            navigation.navigate('ConfirmSignUp', {
              password: password,
            });
          } catch (error) {
            console.log(' Error signing up...', error);
          }

          setUploading(false);
        },
        logout: async (updateAuthState) => {
          try {
            await Auth.signOut();
            await Keychain.resetInternetCredentials('auth');
            updateAuthState('loggedOut');
          } catch (e) {
            console.error(e);
          }
        },
        firstlogin: async (username, password, updateAuthState, navigation) => {
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
          // const getProfileImage = await AsyncStorage.getItem('Profile_Image');

          const getProfileImageMime = await AsyncStorage.getItem(
            'Profile_Image_Mime',
          );
          console.log('getProfileImage');

          const getProfileImageFileName = await AsyncStorage.getItem(
            'Profile_Image_File_Name',
          );
          console.log('getProfileImageFileName');

          const suggestedFileName = getProfileImageFileName.split('/').pop();
          // console.log(suggestedFileName);

          // console.log('getProfileImageFileName');
          setImageFileName(getProfileImageFileName);
          setMimeType(getProfileImageMime);
          // profileImage = getProfileImage;

          // const filenamde = profileImage.substring(
          //   getProfileImageFileName.lastIndexOf('/') + 1,
          // );
          const imageExtension = getProfileImageFileName.substring(
            getProfileImageFileName.lastIndexOf('/') + 1,
          );

          const visibility = 'protected';
          const extension = imageExtension.split('.')[1];
          const key = `images/${uuid()}.${extension}`;
          const keyFile = `${imageExtension}.${extension}`;
          const url = `https://${bucket}.s3.${region}.amazonaws.com/protected/${imageExtension}`;

          const file = {
            key: imageExtension,
            bucket: config.aws_user_files_s3_bucket,
            region: config.aws_project_region,
          };

          console.log(file);
          setError('');

          try {
            const user = await Auth.signIn(username, password);
            await Keychain.setInternetCredentials('auth', username, password);
            await Storage.put(imageExtension, visibility, {
              contentType: mimeType,
              level: 'protected',
            });
            setLoading(false);
            updateAuthState('loggedIn');
            if (user) {
              const session = await Auth.currentSession();
              const userInfo = session?.getIdToken().payload;
            }
            const userInfo = await Auth.currentAuthenticatedUser();
            setName(userInfo.attributes.sub);
            setDescription(userInfo.attributes.sub);
            console.log('name');
            console.log(userInfo.attributes.sub);
            console.log('name');

            // const input = {name, description};
            const input = {
              name: userInfo.attributes.sub,
              description,
              gender,
              preferredGender,
              dob,
              profileImage: file,
              displayname: username,
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
              likes: '',
              notLike: '',
              superLike: '',
            };

            const result = await API.graphql(
              graphqlOperation(createUser, {input}),
            );
            const newUser = result.data.createUser;

            const updatedUser = [newUser, ...users];
            console.log(result);
            setUsers(updatedUser);
            setName('');
          } catch (error) {
            console.log(' Error signing in...', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const addUser = async () => {
  const input = {name};
  const result = await API.graphql(graphqlOperation(createUser, {input}));
  const newUser = result.data.createUser;
  const updatedUser = [newUser, ...users];
  console.log(result);
  setUsers(updatedUser);
  setName('');
};
const useAuth = () => useContext(AuthContext);
export {useAuth};
export default AuthProvider;

// try {
//   const response = await auth().createUserWithEmailAndPassword(
//     email,
//     password,
//   );
//   const isNewUser = response.additionalUserInfo;
//   const {uid} = response.user;

//   const task = storage()
//     .ref('profileImages/' + filename)
//     .putFile(uploadUri);

//   // set progress state
//   task.on('state_changed', (snapshot) => {
//     setTransferred(
//       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
//         10000,
//     );
//   });
//   await task;

//   // console.log(uid);
//   firestore()
//     .collection('Users')
//     .doc(`${userData.uid}`)
//     .set(userData)
//     .then(() => {
//       console.log('user added');
//     });
// } catch (e) {
//   console.log(e);
// }

// await DataStore.save(
//   new User({
//     username,
//     password,
//     attributes: {
//       email,

//       gender,
//       preferredGender,
//       dob,
//       profileImage,
//       displayname: '',
//       aboutMe: '',
//       height: '',
//       weight: '',
//       role: '',
//       bodyType: '',
//       relationshipStatus: '',
//       location: '',
//       tribes: '',
//       lookingFor: '',
//       hivStatus: '',
//       alcohol: '',
//       diet: '',
//       education: '',
//       kids: '',
//       language: '',
//       music: '',
//       pets: '',
//       smoke: '',
//       sport: '',
//       tattoos: '',
//       likes: [],
//       notLike: [],
//       superLike: [],
//     },
//   }),
// );
