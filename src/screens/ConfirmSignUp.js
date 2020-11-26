import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function ConfirmSignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log(' Code confirmed');
      navigation.navigate('SignIn');
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
