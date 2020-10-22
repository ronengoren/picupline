import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Image, Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
var RNFS = require('react-native-fs');

export default function EditAvatar({navigation, route}) {
  const [avatarImage, setAvatarImage] = useState(null);

  selectImage = () => {
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
        setAvatarImage(source);
        // setAvatarFileName(fileName);
        // console.log(source);
      }
    });
  };

  const onSubmit = async () => {
    let user = auth().currentUser;
    console.log(avatarImage);
    try {
      firestore().collection('Users').doc(user.uid).update({
        avatar: avatarImage,
      });
      navigation.navigate('Profile', {avatar: avatarImage});
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text category="h2">Edit Avatar</Text>
      <View>
        {avatarImage ? (
          <Image source={avatarImage} style={{width: 300, height: 300}} />
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
      <Button
        title="Add post"
        status="success"
        onPress={() => onSubmit()}
        style={{marginTop: 30}}></Button>
    </View>
  );
}
