import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, TextInput} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {useAuth} from '../navigation/AuthProvider';
import Form, {TYPES} from 'react-native-basic-form';
// import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';

export default function EditProfile({navigation}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user, updateUser} = useAuth();
  const [language] = React.useState('java');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');

  const totalUsers = firestore()
    .collection('Users')
    .get()
    .then((querySnapshot) => {
      // console.log(querySnapshot);
    });

  const options = [
    {label: 'Basic', value: 1},
    {label: 'Premium', value: 2},
  ];

  // useEffect(() => {
  //   return ref.onSnapshot((querySnapshot) => {
  //     const user = [];
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       const {email, displayName, name} = doc.data();
  //       // console.log(email, displayName, name);
  //       //   list.push({
  //       //     id: doc.id,
  //       //     displayName,
  //       //     email,
  //       //   });
  //     });
  //     // setUsers(list);
  //   });
  // }, []);

  const initialData = {
    // image:
    //   'http://res.cloudinary.com/ddv9bxonm/image/upload/v1585512850/ib9c0dml4dlksi8xgvob.jpg',
    email: user.email,
    password: 'thispasswordisencrypted',
    account_type: 1, //Basic account, see options
    price: 20,
    about_me: user.description,
    start_date: '2020-04-17T21:00:00.000Z',
    // end_date: '2020-04-17T21:00:00.000Z',
  };

  const fields = [
    {name: 'image', label: 'Profile Image', required: true, type: TYPES.Image},
    {name: 'email', label: 'Email Address', required: true, type: TYPES.Email},
    {
      name: 'username',
      label: 'Username',
      required: true,
      autoCapitalize: 'none',
      autoCorrect: false,
    },
    {name: 'password', label: 'Password', required: true, secure: true},
    {
      name: 'account_type',
      label: 'Account Type',
      required: true,
      type: TYPES.Dropdown,
      options: options,
    },
    {name: 'price', label: 'ENTRANCE FEE', required: true, type: TYPES.Number},
    {name: 'about_me', label: 'About Me', required: true, multiline: true},
    [
      //group to appear side by side
      {
        name: 'start_date',
        label: 'START DATE',
        required: true,
        type: TYPES.Date,
      },
      // {name: 'end_date', label: 'END DATE', required: true, type: TYPES.Date},
    ],
  ];

  // firestore()
  //   .collection('Users')
  //   .get()
  //   .then((querySnapshot) => {
  //     console.log('Total users: ', querySnapshot.size);

  //     querySnapshot.forEach((documentSnapshot) => {
  //       userid(documentSnapshot.id);
  //       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
  //     });
  //   });

  async function onSubmit(data) {
    // const updateRef = firebase.firestore().collection('Users').doc(this.state.key);

    // navigation.goBack();
    // setLoading(true);
    console.log(data);
  }
  // async function showImagePicker() {
  //   try {
  //     // <Picker
  //     //   selectedValue={this.state.language}
  //     //   style={{height: 50, width: 100}}
  //     //   onValueChange={(itemValue, itemIndex) =>
  //     //     this.setState({language: itemValue})
  //     //   }>
  //     //   <Picker.Item label="Java" value="java" />
  //     //   <Picker.Item label="JavaScript" value="js" />
  //     // </Picker>;
  //     //return - cancelled or error or uri
  //     //return {cancelled:true}
  //     //return {error:"error message}
  //     //return {uri:...}
  //   } catch (e) {
  //     return {error: e};
  //   }
  // }
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to Chat app</Title>
      <Form
        title={'Edit Profile'} //this is the button title
        fields={fields}
        initialData={initialData} //used in edit mode
        onSubmit={onSubmit}
        loading={loading}
        // showImagePicker={showImagePicker}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginTop: 50,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});
