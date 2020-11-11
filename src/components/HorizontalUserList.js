import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';

export default function HorizontalUserList(props) {
  const [type, setType] = useState();
  const [showType, setShowType] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isRefreshing, setIsRefreshing] = useState();
  const [users, setUsers] = useState([]);
  const [onRefresh, setOnRefresh] = useState();
  // console.log(users);

  isRefreshing;
  onUserPressed = (item) => {
    console.log('user pressed', item);
    // this.props.navigation.navigate("PublicProfile", {userId: item.id});
  };

  getUserItem = (item) => {
    const {smallImageUrl} = item;
    if (type == 'search') {
      return (
        <TouchableOpacity
          onPress={() => {
            onUserPressed(item);
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{margin: 8, width: 40, height: 40, borderRadius: 20}}
              defaultImage={require('../assets/images/boneprofile.png')}
              source={smallImageUrl}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            onUserPressed(item);
          }}>
          <View
            style={{
              margin: 4,
              marginTop: 8,
              marginBottom: 8,
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.profileImage}
              defaultImage={require('../assets/images/boneprofile.png')}
              source={smallImageUrl}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };
  renderFooterComponent = () => {
    if (isLoading && !isRefreshing) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
  };

  renderHorizonalUsers = () => {
    // let members =
    //   props.userType == 'topUsers' ? users.topUsers : users.newUsers;
    renderItem = ({item}) => {
      return getUserItem(item);
    };
    // onRefresh = () => {
    //   if (this.props.onRefresh) {
    //     this.props.onRefresh();
    //   }
    // };
    return showType == 'horizontal' ? (
      <FlatList
        data={props.users}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComponent()}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        horizontal={true}
        key={'horizontal'}
      />
    ) : (
      <FlatList
        data={props.users}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComponent()}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        numColumns={6}
        key={'grid'}
      />
    );
  };
  return (
    <View
      style={
        type == 'search'
          ? showType == 'grid'
            ? styles.gridContainer
            : styles.searchContainer
          : styles.container
      }>
      {renderHorizonalUsers()}
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
  },
  gridContainer: {
    height: 180,
  },
  container: {
    height: 108,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  separator: {
    height: 0.5,
    marginLeft: 64,
    backgroundColor: Colors.lightIndigo,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  headerView: {
    flex: 1,
    marginStart: 16,
    marginEnd: 16,
  },
  emptyView: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  name: {
    fontSize: 17,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: Colors.paleGreyTwo,
  },
  profileImage: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
});
