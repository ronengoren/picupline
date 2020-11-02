import React from 'react';

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const PRIMARY_COLOR = '#7444C0';
const SECONDARY_COLOR = '#5636B8';
const WHITE = '#FFFFFF';
const GRAY = '#757E90';
const DARK_GRAY = '#363636';
const BLACK = '#000000';

const ONLINE_STATUS = '#46A575';
const OFFLINE_STATUS = '#D04949';

const STAR_ACTIONS = '#FFA200';
const LIKE_ACTIONS = '#B644B2';
const DISLIKE_ACTIONS = '#363636';
const FLASH_ACTIONS = '#5028D7';

const ICON_FONT = 'tinderclone';

const DIMENSION_WIDTH = Dimensions.get('window').width;
const DIMENSION_HEIGHT = Dimensions.get('window').height;

const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant,
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 10,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 100,
      height: variant ? 170 : 280,
      margin: variant ? 0 : 13,
    },
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30,
      fontFamily: Colors.medium,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="md-heart" size={18} /> {matches}% Match !
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {/* STATUS */}
      {status && (
        <View style={styles.status}>
          <View style={status === 'Online' ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.star}>
              <Icon name="md-star" size={25} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text style={styles.like}>
              <Icon name="md-heart" size={30} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}>
            <Text style={styles.dislike}>
              <Icon name="md-close" size={30} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Text style={styles.flash}>
              <Icon name="md-flash" size={25} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  containerCardItem: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    height: 500,
  },
  containerCardItem2: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    height: 260,
    width: 165,
    marginRight: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  matchesTextCardItem: {
    fontFamily: Colors.medium,
    color: WHITE,
    margin: 8,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  status: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: GRAY,
    fontSize: 12,
    fontWeight: 'bold',
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'silver',
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: {height: 10, width: 0},
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'black',
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: {height: 10, width: 0},
  },
  star: {
    fontFamily: Colors.medium,
    color: 'gold',
  },
  like: {
    fontSize: 25,
    fontFamily: Colors.medium,
    color: '#BC243C',
  },
  dislike: {
    fontSize: 25,
    fontFamily: Colors.medium,
    color: DISLIKE_ACTIONS,
  },
  flash: {
    fontFamily: Colors.medium,
    color: 'white',
  },
});
