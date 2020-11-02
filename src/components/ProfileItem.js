import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const ProfileItem = ({
  age,
  info1,
  info2,
  info3,
  info4,
  info5,
  info6,
  info7,
  info8,
  info9,
  info10,
  info11,
  info12,
  info13,
  info14,
  info15,
  info16,
  info17,
  info18,
  info19,

  location,
  matches,
  name,
}) => {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          <Icon name="md-heart" /> {matches}% Match!
        </Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-person" />
        </Text>
        <Text style={styles.infoContent}>About Me: {info1}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-walk" />
        </Text>
        <Text style={styles.infoContent}>Alcohol: {info2}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-happy" />
        </Text>
        <Text style={styles.infoContent}>Body Type: {info3}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Diet: {info4}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Education: {info5}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Height: {info6}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Weight: {info7}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>HIV Status: {info8}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Kids: {info9}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Language: {info10}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Looking For: {info11}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Music: {info12}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Pets: {info13}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Relationsip Status: {info14}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Role: {info15}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Smoke: {info16}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Sport: {info17}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Tattoos: {info18}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="md-calendar" />
        </Text>
        <Text style={styles.infoContent}>Tribes: {info19}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  containerProfileItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {height: 0, width: 0},
  },
  matchesProfileItem: {
    width: 131,
    marginTop: -15,
    backgroundColor: '#7444C0',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  matchesTextProfileItem: {
    fontFamily: Colors.medium,
    color: '#FFFFFF',
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: '#363636',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descriptionProfileItem: {
    color: '#757E90',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconProfile: {
    fontFamily: Colors.medium,
    fontSize: 12,
    color: '#363636',
    paddingHorizontal: 10,
  },
  infoContent: {
    color: '#757E90',
    fontSize: 13,
  },
});
