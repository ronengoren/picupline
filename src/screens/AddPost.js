import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

//aws
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {createUser as CreateUser} from '../../graphql/mutations';
import {listUsers} from '../../graphql/queries';
import {onCreateUser} from '../../graphql/subscriptions';
import config from '../../aws-exports';

//

// firebase
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// libraries
import uuid from 'uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from 'aws-amplify-react-hooks';

//style
import {getFilePathFromLocalUri} from '../infra/utils';

export default function AddPost({navigation, route}) {
  const [check, setOwner] = useState(false);
  const [input, setJob] = useState({
    description: '',
  });
  const onChange = (item) => setUser(item);
  const [setCreate, setUpdate, setDelete, {loading, error}] = useMutation(
    input,
  );

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

  return (
    <View style={{flex: 1, marginTop: 60}}>
      <View>
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
      </View>
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
});
