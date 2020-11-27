import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import EditAvatar from '../screens/EditAvatar';
import MessagesScreen from '../screens/MessagesScreen';
import Loading from '../components/Loading';
import SignUpWizard from './SignUpWizard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {Auth} from 'aws-amplify';
import {onScreen} from '../constants';
import {ThemeProvider} from 'react-native-elements';
import {enableScreens} from 'react-native-screens'; // eslint-disable-line
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import Welcome from '../screens/welcome/Welcome';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import TopPicksScreen from '../screens/TopPicksScreen';
import Icon from 'react-native-vector-icons/Ionicons';

enableScreens();

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AppTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'TopPicks') {
            iconName = focused
              ? 'ios-heart-circle-outline'
              : 'ios-heart-circle';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'body-outline' : 'body-sharp';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'mail-open-outline' : 'mail-open';
          } else if (route.name === 'Top') {
            iconName = focused ? 'ios-star-outline' : 'ios-star';
          } else if (route.name === 'Add') {
            iconName = focused ? 'md-add-outline' : 'md-add';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Top">
        {(screenProps) => (
          <AppNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};
const AuthenticationNavigator = (props) => {
  return (
    <AuthenticationStack.Navigator headerMode="none" initialRouteName="Login">
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />

      <AuthenticationStack.Screen name="Login">
        {(screenProps) => (
          <LoginScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="ConfirmSignUp">
        {(screenProps) => (
          <ConfirmSignUp
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AuthenticationStack.Screen>

      <AuthenticationStack.Screen name="SignUp" component={SignupScreen} />
      <AuthenticationStack.Screen
        name="SignUpWizard"
        component={SignUpWizard}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Top">
        {(screenProps) => (
          <TopPicksScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="EditAvatar" component={EditAvatar} />
      <AppStack.Screen name="Messages" component={MessagesScreen} />
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};
function Routes() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [loading, setLoading] = useState(false);
  // const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    checkAuthState();
    const key = async () => {
      try {
        const credentials = await Keychain.getInternetCredentials('auth');
        // console.log(credentials);
        if (credentials) {
          const {username, password} = credentials;
          const user = await Auth.signIn(username, password);
          setLoading(false);
          setUserLoggedIn('loggedIn');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log('error', err); // eslint-disable-line
        setLoading(false);
        setUserLoggedIn('loggedOut');
      }
    };
    key();
    // checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log(' User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log(err);

      setUserLoggedIn('loggedOut');
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
    console.log(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Loading />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppTabNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
}

export default Routes;
