import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Image, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid';

export default function AddPost({navigation, route}) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChangeTitle = (title) => {
    setTitle(title);
  };
  const onChangeDescription = (description) => {
    setDescription(description);
  };
  const onSubmit = async () => {
    // console.log(title);
    // console.log(description);

    try {
      const post = {
        photo: image,
        title: title,
        description: description,
      };
      let user = auth().currentUser;
      const id = uuid.v4();
      const uploadData = {
        uid: user.uid,
        id: id,
        postPhoto: post.photo,
        postTitle: post.title,
        postDescription: post.description,
        likes: [],
      };
      firestore().collection('posts').doc(id).set(uploadData);
      setImage(null);
      setTitle('');
      setDescription('');
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  const selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  return (
    <View style={{flex: 1, marginTop: 60}}>
      <View>
        {image ? (
          <Image source={image} style={{width: '100%', height: 300}} />
        ) : (
          <Button
            title="Add an image"
            onPress={() => selectImage()}
            style={{
              alignItems: 'center',
              padding: 10,
              margin: 30,
            }}></Button>
        )}
      </View>
      <View style={{marginTop: 80, alignItems: 'center'}}>
        <Text category="h4">Post Details</Text>
        <TextInput
          placeholder="Enter title of the post"
          style={{margin: 20}}
          value={title}
          onChangeText={(title) => onChangeTitle(title)}
        />
        <TextInput
          placeholder="Enter description"
          style={{margin: 20}}
          value={description}
          onChangeText={(description) => onChangeDescription(description)}
        />
        <Button
          title="Add Post"
          status="success"
          onPress={() => onSubmit()}
          disabled={image && title && description ? false : true}></Button>
      </View>
    </View>
  );
}
