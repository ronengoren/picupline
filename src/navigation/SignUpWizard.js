import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SetUserGender from '../screens/signup/SetUserGender';
import SetUserPerf from '../screens/signup/SetUserPerf';
import UploadImages from '../screens/signup/UploadImages';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function SignUpWizard() {
  return (
    <Stack.Navigator initialRouteName="SetUserGender" headerMode="none">
      <Stack.Screen name="SetUserGender" component={SetUserGender} />
      <Stack.Screen name="SetUserPerf" component={SetUserPerf} />
      <Stack.Screen name="UploadImages" component={UploadImages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
