import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

//aws
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {createUser, deleteUser} from '../../graphql/mutations';
import {listUsers} from '../../graphql/queries';
// import {onCreateUser} from '../../graphql/subscriptions';
import config from '../../aws-exports';

import {Auth} from 'aws-amplify';

//

// firebase
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// libraries
import uuid from 'uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from 'aws-amplify-react-hooks';
import Icon from 'react-native-vector-icons/Ionicons';

//style
import {getFilePathFromLocalUri} from '../infra/utils';

const {width} = Dimensions.get('window');

export default function AddPost({navigation, route}) {
  const [image, setImage] = useState(null);
  const [storageImage, setStorageImage] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [imageMime, setImageMime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [localuri, setLocaluri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageURI, setImageURI] = useState(null);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  const onChangeTitle = (title) => {
    setTitle(title);
  };
  const onChangeDescription = (description) => {
    setDescription(description);
  };
  const onSubmit = async () => {
    const filename = localuri.substring(localuri.lastIndexOf('/') + 1);

    const uploadUri =
      Platform.OS === 'ios'
        ? storageImage.replace('file://', '')
        : storageImage;
    const extension = filename.split('.')[1];
    console.log(imageMime);

    // const reference = storage().ref(filename);
    // setUploading(true);
    // setTransferred(0);
    // const task = storage()
    //   .ref('userImages/' + filename)
    //   .putFile(uploadUri);

    // task.on('state_changed', (snapshot) => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    //   );
    //   switch (snapshot.state) {
    //     case 'running':
    //       setImageURI(null);
    //       // setUpload({ loading: true, progress });
    //       break;
    //     case 'success':
    //       snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         // console.log(downloadURL);
    //         setImageURI({uri: downloadURL});
    //         // setUpload({ loading: false });
    //       });
    //       break;
    //     default:
    //       break;
    //   }
    // });
    // // console.log(postImageUrl);
    // // console.log(description);

    // try {
    //   await task;
    //   const post = {
    //     photo: localuri,
    //   };
    //   let user = auth().currentUser;
    //   const id = uuid.v4();
    //   const uploadData = {
    //     uid: user.uid,
    //     id: id,
    //     postPhoto: post.photo,

    //     likes: [],
    //   };
    //   firestore().collection('posts').doc(id).set(uploadData);
    //   setImage(null);

    //   setUploading(false);

    //   navigation.navigate('Home');
    // } catch (e) {
    //   console.error(e);
    // }
  };
  //
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
        setStorageImage(image.path);
        setImageMime(image.mime);
        // setAndroidImage(image.path);
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

        setLocaluri(localuri);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message ? e.message : e);
      });
  };
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  const addUser = async () => {
    const input = {name};
    console.log(input);
    const result = await API.graphql(graphqlOperation(createUser, {input}));
    const newUser = result.data.createUser;
    const updatedUser = [newUser, ...users];
    setUsers(updatedUser);
    setName('');
  };
  const removeUser = async (id) => {
    try {
      const input = {id};
      const result = await API.graphql(
        graphqlOperation(deleteUser, {
          input,
        }),
      );
      const deletedUserId = result.data.deleteUser.id;
      const updatedUser = users.filter((user) => user.id !== deletedUserId);
      setUsers(updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchUsers() {
    try {
      setLoading(true);

      const userData = await API.graphql(graphqlOperation(listUsers));
      const users = userData.data.listUsers.items;
      setUsers(users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error fetching data');
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <ScrollView>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Add a User"
        />
        <TouchableOpacity onPress={addUser} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}
        {users.map((user, index) => (
          <View key={index} style={styles.itemContainer}>
            {/* <Text style={styles.itemName}>{user.name}</Text> */}
            <Text style={styles.itemName}>{user.owner}</Text>
            <TouchableOpacity onPress={() => removeUser(user.id)}>
              <Icon name="md-trash" size={18} color="tomato" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* <View>
        {image ? (
          <Image
            source={{uri: 'file://' + localuri}}
            style={{width: '100%', height: 300}}
          />
        ) : (
          <Button
            title="Add an image"
            onPress={() => pickSingle(false)}
            style={{
              alignItems: 'center',
              padding: 10,
              margin: 30,
            }}></Button>
        )}
      </View>
      <View style={{marginTop: 80, alignItems: 'center'}}>
        <Text category="h4">Post Details</Text>

        <Button
          title="Add Post"
          status="success"
          onPress={() => onSubmit()}
          disabled={image ? false : true}></Button>
      </View> */}
      {/* <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload image</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6',
    marginTop: 20,
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
    marginVertical: 10,
    width: width * 0.8,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: 'tomato',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: width * 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  itemContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
  },
  loadingContainer: {
    marginVertical: 10,
  },
});
