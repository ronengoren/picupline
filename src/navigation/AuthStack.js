import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import Welcome from '../screens/welcome/Welcome';
import SignUpWizard from '../navigation/SignUpWizard';
import ConfirmSignUp from '../screens/ConfirmSignUp';

const Stack = createStackNavigator();
const AuthStack = (props) => {
  // console.log(props.updateAuthState);
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name="Login">
        {(screenProps) => (
          <LoginScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ConfirmSignUp">
        {(screenProps) => (
          <ConfirmSignUp
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignUpWizard" component={SignUpWizard} />
    </Stack.Navigator>
  );
};

export default AuthStack;
