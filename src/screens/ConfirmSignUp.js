import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import config from '../../aws-exports';
import {Storage, API, graphqlOperation} from 'aws-amplify';

export default function ConfirmSignUp({navigation, updateAuthState, route}) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState(route.params.password);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  // console.log(updateAuthState);

  const {firstlogin} = useContext(AuthContext);

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log(' Code confirmed');
      firstlogin(username, password, updateAuthState, navigation);
    } catch (error) {
      console.log(
        ' Verification code does not match. Please enter a valid verification code.',

        error.code,
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>

        <FormInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <FormInput
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          autoCapitalize="none"
          labelName="Enter verification code"
          keyboardType="numeric"
        />

        <FormButton
          title="Confirm Sign Up"
          onPress={confirmSignUp}
          modeValue="contained"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,

    backgroundColor: 'white',
  },

  container: {
    flex: 1,

    alignItems: 'center',
  },

  title: {
    fontSize: 20,

    color: '#202020',

    fontWeight: '500',

    marginVertical: 15,
  },
});
