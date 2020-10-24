import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {IconButton} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import TopPicksScreen from '../screens/TopPicksScreen';
import EditProfile from '../screens/EditProfile';
import EditAvatar from '../screens/EditAvatar';
import AddPost from '../screens/AddPost';

import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';
import {AuthContext} from '../navigation/AuthProvider';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditAvatar" component={EditAvatar} />
    </Stack.Navigator>
  );
};
/**
 * All chat app related screens
 */

function ChatApp() {
  const {logout} = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      // headerMode="none"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout-variant"
              size={28}
              color="#ffffff"
              onPress={() => logout()}
            />
          ),
        })}
      />
      <ChatAppStack.Screen
        name="Room"
        component={RoomScreen}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </ChatAppStack.Navigator>
  );
}

function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
}

export default function TabNavigator() {
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
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Top" component={TopPicksScreen} />
      <Tab.Screen name="Add" component={AddPost} />
    </Tab.Navigator>
  );
}
