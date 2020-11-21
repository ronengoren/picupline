import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import auth from '@react-native-firebase/auth';
import Autocomplete from 'react-native-autocomplete-input';
import HorizontalUserList from './HorizontalUserList';
import CollapsibleView from './CollapsibleView';
import calculatePortraitDimension from '../constants/calculatePortraitDimension';

const {width: deviceWidth, height: deviceHeight} = calculatePortraitDimension();

const UserSearchView = (props) => {
  const currentUser = auth().currentUser;
  const [query, querySet] = useState('');
  const [searchUsers, setSearchUsers] = useState(props.users);
  const getSearchItemView = (item, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('search item clinck', item);
          // this.props.navigation.navigate('PublicProfile', {userId: item.uid});
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            marginLeft: 8,
          }}>
          <Image
            style={styles.userImage}
            source={{uri: item.uri}}
            resizeMode="contain"
          />
          <Text style={styles.username}> {item.uid}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onSearch = (text, userId) => {
    if (text && text.length > 0) {
      let data = {
        id: userId,
        query: text,
        offset: 0,
        limit: 50,
      };
      this.props.dispatch(search(data));
    } else {
      this.props.dispatch(emptySearch());
    }
  };
  const getSearchBox = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: Colors.red,
          zIndex: 100,
        }}>
        <Text style={[styles.text, {padding: 16}]}>{'SEARCH BY NAME'}</Text>
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16,
            backgroundColor: 'white',
            height: 40,
            alignSelf: 'stretch',
          }}>
          <Autocomplete
            containerStyle={styles.autocompleteContainer}
            data={searchUsers}
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={query}
            placeholder={'@username'}
            onChangeText={(text) => {
              if (user && user.uid) {
                onSearch(text, user.uid);
              }
            }}
            listStyle={{maxHeight: (deviceHeight / 3) * 2}}
            renderItem={({item, i}) => getSearchItemView(item, i)}
          />
        </View>
      </View>
    );
  };
  const getBottomView = () => {
    return (
      <View style={{alignSelf: 'stretch', paddingHorizontal: 16}}>
        <Text style={[styles.title]}>{"WHO'S ONLINE"}</Text>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
          }}>
          <Button
            secondary
            style={{
              alignSelf: 'stretch',
              marginBottom: 32,
              marginTop: 16,
              marignLeft: 0,
              marginRight: 0,
            }}
            title={'ONLINE NOW'}
            textColor={'white'}
            bgColor={Colors.red}
            // onPress={() => {
            //   this.props.dispatch(enableOnline(true));
            // }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.transparentOverlay}>
      <View style={styles.container}>
        {getSearchBox()}
        <CollapsibleView
          title={'NEW GUYS'}
          getComponent={(collapsed) => {
            return (
              <HorizontalUserList
                type={'search'}
                navigation={props.navigation}
                showType={collapsed ? 'horizontal' : 'grid'}
              />
            );

            return null;
          }}
        />
        {getBottomView()}
      </View>
    </View>
  );
};

export default UserSearchView;

const styles = StyleSheet.create({
  transparentOverlay: {
    backgroundColor: Colors.clearBlack,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  text: {
    fontSize: 13,
    color: 'white',
  },
  autocompleteContainer: {
    flex: 1,
  },
  userImage: {
    padding: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.buttonGrey,
    backgroundColor: Colors.buttonGrey,
  },
  title: {
    fontSize: 13,
    color: Colors.pinkishRed,
  },
  username: {
    marginLeft: 16,
    fontSize: 12,
    color: 'black',
  },
});
