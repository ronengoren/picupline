import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import TopNavigatorView from '../../components/homeComponents/TopNavigatorView';
import NumberRangePickerListItem from '../../components/homeComponents/NumberRangePickerListItem';
import ItemPickerListItem from '../../components/homeComponents/ItemPickerListItem';
import ListItem from '../../components/homeComponents/ListItem';
import calculatePortraitDimension from '../../constants/calculatePortraitDimension';
import showAlert from '../../constants/alert';

import ListItemSwitch from '../../components/homeComponents/ListItemSwitch';
const {height: deviceHeight, width: deviceWidth} = calculatePortraitDimension();

const UserFilter = (props) => {
  // console.log(props);
  getResetButton = () => {
    return (
      <TouchableOpacity
      //   onPress={()=>{
      //     this.props.dispatch(resetFilter());
      //   }}
      >
        <View
          style={{
            paddingRight: 16,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
            Reset
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  getTopNavigator = () => {
    return (
      <TopNavigatorView
        title={'Filter'}
        onBackPressed={() => {
          this.props.dispatch(refreshUsers(true));
          this.props.navigation.goBack();
        }}
        rightComponent={getResetButton()}
      />
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {getTopNavigator()}
        <ScrollView>
          <View style={styles.contentContainer}>
            <ListItemSwitch
              title={'FILTER'}
              rightIconImageOn={require('../../assets/images/boneoncb.png')}
              rightIconImageOff={require('../../assets/images/boneoffcb.png')}
              //   value={filteron}
              itemContainerStyle={{
                paddingLeft: 16,
                paddingRight: 16,
                marginLeft: 0,
                marginRight: 0,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderBottomColor: Colors.red,
                borderTopColor: Colors.red,
              }}
              //   onChangeState={(value) => {
              //     this.props.dispatch(enableFilter(value));
              //   }}
            />
            <ListItemSwitch
              title={'PLACE'}
              rightIconImageOn={require('../../assets/images/boneoncb.png')}
              rightIconImageOff={require('../../assets/images/boneoffcb.png')}
              // value={filters.hasPlace}
              onChangeState={(value) => {
                let filter = {
                  hasPlace: value,
                };
                // this.props.dispatch(updateFilter(filter));
              }}
            />
            <NumberRangePickerListItem
              title={'AGE'}
              fromValue={1}
              toValue={10}
              min={18}
              max={120}
              onPickRange={(min, max) => {
                let filter = {
                  minAge: min,
                  maxAge: max,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />
            <NumberRangePickerListItem
              title={'HEIGHT'}
              fromValue={18}
              toValue={20}
              min={100}
              max={250}
              onPickRange={(min, max) => {
                let filter = {
                  minHeight: min,
                  maxHeight: max,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />
            <ItemPickerListItem
              title={'ROLE'}
              // items={modifiables.roles}
              // value={filters.role? filters.role.name: null}
              onPickItem={(item) => {
                let filter = {
                  role: item,
                  roleId: item.id,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />
            <ItemPickerListItem
              title={'BODY TYPE'}
              //   items={modifiables.bodyTypes}
              //   value={filters.bodyType ? filters.bodyType.name : null}
              onPickItem={(item) => {
                let filter = {
                  bodyType: item,
                  bodyTypeId: item.id,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />
            <ItemPickerListItem
              title={'STATUS'}
              //   items={modifiables.sexualStatuses}
              //   value={filters.sexualStatus ? filters.sexualStatus.name : null}
              onPickItem={(item) => {
                let filter = {
                  sexualStatus: item,
                  statusId: item.id,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />

            <ItemPickerListItem
              title={'HIV STATUS'}
              //   items={modifiables.hivStatus}
              //   value={filters.hivStatus ? filters.hivStatus.name : null}
              onPickItem={(item) => {
                let filter = {
                  hivStatus: item,
                  hivStatusId: item.id,
                };
                this.props.dispatch(updateFilter(filter));
              }}
            />
            <ListItem
              title={'Tribes'}
              rightIconImage={require('../../assets/images/forward.png')}
              //   onItemPress={() => {
              //     console.log('original tribes', filters.tribes);
              //     this.props.navigation.navigate('MultipleItemPickerView', {
              //       title: 'Tribes',
              //       items: modifiables.tribes,
              //       selectedItems: filters.tribes,
              //       inputType: 'textinput',
              //       returnData: (value) => {
              //         console.log('tribes', value);
              //         let filter = {
              //           tribes: value,
              //           tribeIds: value.map((tribe) => tribe.id),
              //         };
              //         this.props.dispatch(updateFilter(filter));
              //       },
              //     });
              //   }}
            />
            <ListItem
              title={'Looking For'}
              rightIconImage={require('../../assets/images/forward.png')}
              //   onItemPress={() => {
              //     this.props.navigation.navigate('MultipleItemPickerView', {
              //       title: 'Looking For',
              //       items: modifiables.lookingFors,
              //       selectedItems: filters.lookingFors,
              //       inputType: 'textinput',
              //       returnData: (value) => {
              //         let filter = {
              //           lookingFors: value,
              //           lookingForIds: value.map((lookingFor) => lookingFor.id),
              //         };
              //         this.props.dispatch(updateFilter(filter));
              //       },
              //     });
              //   }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 0,
    marginTop: 15,
  },
  spliter: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: Colors.lightGreyBlue,
  },
});

export default UserFilter;
